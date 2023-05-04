import axios from "axios";
import { metricRef } from "./timestreamConstants";
import { floorToSecond, formatTSTime } from "./timestreamHelpers";
import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";
import TimestreamModel from "../timestreamAPI/TimestreamModel";
import queryParser from "../../helpers/timestreamAPI/functions/queryParser";

class AppCacheManager {

    private readonly tideRefreshRate = 18000000; // 5 hours
    private readonly yvrLat = '49.1967';
    private readonly yvrLong = '123.1815';

    // private readonly deviceRefreshRate = 3600000; // 1 hour
    private readonly deviceIds = ['0', '1'];

    private cachedTideData: rawTideDataType[] | null;
    private cachedTideExtremeData: rawTideExtremeDataType[] | null;
    private tideInterval: NodeJS.Timer | null;

    // private cachedDeviceMetricData: cachedDeviceMetricType | null;
    // private cachedDeviceMetricInterval: NodeJS.Timer | null;

    constructor() {
        this.cachedTideData = null;
        this.tideInterval = null;
        this.cachedTideExtremeData = null;

        // this.cachedDeviceMetricData = null;
        // this.cachedDeviceMetricInterval = null;
    };

    /* Tide Data */

    public getTideData = async () => {

        if (!this.cachedTideData || !this.cachedTideExtremeData) {
            await this.fetchTideData();
        }

        return { 'tideData': this.cachedTideData, 'tideExtremes': this.cachedTideExtremeData };;
    };

    public registerTideCache = async () => {

        const tideData = await this.fetchTideData();

        if (tideData) {
            this.cachedTideData = tideData['tideData'];
            this.cachedTideExtremeData = tideData['tideExtremes']

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

    public fetchMonthlyDeviceData = async () => {

        const now = floorToSecond(new Date().toISOString());
        const prevMonth = floorToSecond(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());

        const deviceData: any = {};

        await Promise.all(this.deviceIds.map(async (id) => {
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

    };

    // private fetchDeviceCurrentData = async () => {

    // };


}

const AppCache = new AppCacheManager();

export default AppCache;
