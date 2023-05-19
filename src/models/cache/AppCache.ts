import axios from "axios";
import { DEVICE_IDS, metricRef } from "./timestreamConstants";
import { floorToSecond, formatTSTime } from "./timestreamHelpers";
import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";
import TimestreamModel from "../timestreamAPI/TimestreamModel";
import queryParser from "../../helpers/timestreamAPI/functions/queryParser";

class AppCacheManager {

    private readonly tideRefreshRate = 18000000; // 5 hours
    private readonly yvrLat = '49.1967';
    private readonly yvrLong = '123.1815';

    private readonly deviceRefreshRate = 3600000; // 1 hour

    private cachedTideData: rawTideDataType[] | null;
    private cachedTideExtremeData: rawTideExtremeDataType[] | null;
    private tideInterval: NodeJS.Timer | null;

    private cachedDeviceMetricData: cachedDeviceMetricType | null;
    private cachedDeviceMetricInterval: NodeJS.Timer | null;

    private cachedHighLow: deviceHighLow | null;

    constructor() {
        this.cachedTideData = null;
        this.tideInterval = null;
        this.cachedTideExtremeData = null;

        this.cachedDeviceMetricData = null;
        this.cachedDeviceMetricInterval = null;

        this.cachedHighLow = null;
    };

    /* Tide Data */

    public getTideData = async () => {

        if (!this.cachedTideData || !this.cachedTideExtremeData) {
            await this.registerDeviceCache();
        }

        return { 'tideData': this.cachedTideData, 'tideExtremes': this.cachedTideExtremeData };;
    };

    public registerTideCache = async () => {

        const tideData = await this.fetchTideData();

        if (tideData) {
            this.cachedTideData = tideData['tideData'];
            this.cachedTideExtremeData = tideData['tideExtremes'];

        } else {
            return null;
        }

        this.tideInterval = setInterval(async () => {

            const refreshedTideData = await this.fetchTideData();

            if (refreshedTideData) {
                this.cachedTideData = refreshedTideData['tideData'];
                this.cachedTideExtremeData = tideData['tideExtremes'];
            }

        }, this.tideRefreshRate);

        return this.tideInterval;
    };

    private fetchTideData = async () => {

        try {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow =
                new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];


            const tideLevelsResponse = await axios.get(`https://api.stormglass.io/v2/tide/sea-level/point?lat=${this.yvrLat}&lng=${this.yvrLong}&start=${today}&end=${tomorrow}`,
                { headers: { Authorization: process.env.TIDE_API_KEY } }
            );

            const tideExtremesResponse = await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${this.yvrLat}&lng=${this.yvrLong}&start=${today}&end=${tomorrow}`,
                { headers: { Authorization: process.env.TIDE_API_KEY } }
            );

            if (tideLevelsResponse.status === 200 && tideExtremesResponse.status === 200) {

                const tideData: rawTideDataType[] = tideLevelsResponse.data.data;
                const tideExtremes: rawTideExtremeDataType[] = tideExtremesResponse.data.data;

                return { 'tideData': tideData, 'tideExtremes': tideExtremes };
            }
            return null;

        } catch (_err) {
            return null;
        }

    };

    /* Timestream Data */

    public registerDeviceCache = async () => {

        const deviceData = await this.fetchMonthlyDeviceData();

        if (deviceData) {
            this.cachedDeviceMetricData = deviceData;

        } else {
            return null;
        }

        this.cachedDeviceMetricInterval = setInterval(async () => {

            const refreshedMetricData = await this.fetchDeviceCurrentData();

            if (refreshedMetricData) {
                this.cachedDeviceMetricData = refreshedMetricData;
            }

        }, this.deviceRefreshRate);

        return this.cachedDeviceMetricInterval;
    };

    public getDeviceData = async () => {
        if (!this.cachedDeviceMetricData) {
            await this.registerDeviceCache();
        }

        return this.cachedDeviceMetricData;
    };

    private fetchMonthlyDeviceData = async () => {

        try {
            const now = floorToSecond(new Date().toISOString());
            const prevMonth = floorToSecond(new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString());

            const deviceData: any = {};

            await Promise.all(DEVICE_IDS.map(async (id) => {
                const parsedDeviceId = queryBuilder.parseDeviceList(id);

                deviceData[id] = {}

                await Promise.all(
                    Object.keys(metricRef).map(async (metric) => {

                        let fetchedData = await TimestreamModel.getHistoricalData(
                            parsedDeviceId, metric, prevMonth, now);

                        if (fetchedData) {

                            fetchedData = queryParser.parseQueryResult(fetchedData);

                            if (fetchedData.length > 0) {

                                deviceData[id][metricRef[metric]] =
                                    fetchedData.map((datum: any) => {
                                        return (
                                            {
                                                'time': formatTSTime(datum['time']),
                                                'value': parseFloat(datum['measure_value::double'])
                                            }
                                        )
                                    });
                            }
                        }

                    })
                );

            }));

            if (Object.keys(deviceData).length === 0) {
                // This means it failed to fetch
                return null;
            }
            return deviceData;

        } catch (_err) {
            return null;

        }
    };

    private fetchDeviceCurrentData = async () => {

        try {
            if (this.cachedDeviceMetricData) {

                const updatedCachedData: any = { ...this.cachedDeviceMetricData };

                await Promise.all(DEVICE_IDS.map(async (id) => {

                    let fetchedData = await TimestreamModel.getBuoyData(id);

                    if (fetchedData) {

                        fetchedData = queryParser.parseQueryResult(fetchedData)
                            .filter((datum: any) => Object.keys(metricRef).includes(datum['measure_name']));

                        fetchedData.map((datum: any) => {
                            this.updateHistoricalHighLow(datum['buoy_id'], datum['measure_name'], datum['measure_value::double'])

                            let prevCachedMetricData = updatedCachedData[id][metricRef[datum['measure_name']]];

                            if (prevCachedMetricData) {

                                prevCachedMetricData.shift();

                                prevCachedMetricData.push(
                                    {
                                        'time': formatTSTime(datum['time']),
                                        'value': parseFloat(datum['measure_value::double'])
                                    }
                                );

                                updatedCachedData[id][metricRef[datum['measure_name']]] = prevCachedMetricData;
                            }

                        });

                    }

                }));
                return updatedCachedData;
            }

            return null;

        } catch (_err) {
            return null;
        }

    };

    public registerHistoricalHighLow = async () => {
        const historicalHighLow: any = {};

        try {
            await Promise.all(DEVICE_IDS.map(async (id) => {
                const parsedDeviceId = queryBuilder.parseDeviceList(id)

                historicalHighLow[id] = {};

                await Promise.all(Object.keys(metricRef).map(async (metric) => {
                    let fetchedLow = await TimestreamModel.getHistoricalLow(parsedDeviceId, metric);
                    let fetchedHigh = await TimestreamModel.getHistoricalHigh(parsedDeviceId, metric);

                    if (fetchedLow && fetchedHigh) {
                        fetchedLow = queryParser.parseQueryResult(fetchedLow);
                        fetchedHigh = queryParser.parseQueryResult(fetchedHigh);

                        let currentLow = fetchedLow[0]['minimum']
                        let currentHigh = fetchedHigh[0]['maximum']

                        if (currentHigh !== null && currentLow !== null) {
                            historicalHighLow[id][metricRef[metric]] = {
                                "low": parseFloat(currentLow),
                                "high": parseFloat(currentHigh)
                            }
                        }
                    }
                }))
            }))

            if (Object.keys(historicalHighLow).length === 0) {
                return null;
            }
            this.cachedHighLow = historicalHighLow;
            return this.cachedHighLow;
        } catch (error) {
            return null;
        }
    };

    private updateHistoricalHighLow = async (buoyId: string, metric: string, value: string) => {
        if (this.cachedHighLow && this.cachedHighLow[buoyId][metricRef[metric]]) {
            if (this.cachedHighLow[buoyId][metricRef[metric]]['low'] > parseFloat(value)) {
                this.cachedHighLow[buoyId][metricRef[metric]]['low'] = parseFloat(value);
            }

            if (this.cachedHighLow[buoyId][metricRef[metric]]['high'] < parseFloat(value)) {
                this.cachedHighLow[buoyId][metricRef[metric]]['high'] = parseFloat(value);
            }
        }
    }

    public getHistoricalHighLow = async () => {
        if (!this.cachedHighLow) {
            await this.registerHistoricalHighLow();
        }

        return this.cachedHighLow;
    };

    public getCurrentMeasurement = (metric: string, device: string) => {
        if (this.cachedDeviceMetricData && metric in this.cachedDeviceMetricData[device]) {
            return this.cachedDeviceMetricData[device][metric][this.cachedDeviceMetricData[device][metric].length - 1]['value'];
        }
        return null;
    }

}

const AppCache = new AppCacheManager();

export default AppCache;
