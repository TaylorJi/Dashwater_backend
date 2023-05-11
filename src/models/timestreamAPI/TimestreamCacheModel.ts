import AppCache from "../cache/AppCache";
import { metricUnitRef } from "../cache/timestreamConstants";
import { formatTSTime } from "../cache/timestreamHelpers";

const getCachedDeviceData = async (end: string) => {

    try {
        const cachedData = await AppCache.getDeviceData();

        if (cachedData) {

            return remapDeviceDataFromCache(cachedData, end);
        }

        return null;

    } catch (_err) {
        return null;
    }

};


const remapDeviceDataFromCache = (cachedData: any, end?: string) => {

    const mappedData: any = {};

    Object.keys(cachedData).map((device) => {

        mappedData[device] = Object.keys(cachedData[device]).map((metric: any) => {
            return {
                measureName: metric,
                xAxisName: metricUnitRef[metric]['xAxisName'],
                yAxisName: metricUnitRef[metric]['yAxisName'],
                data: !end ? cachedData[device][metric] :
                    cachedData[device][metric].filter((metric: any) =>
                        new Date(metric.time).getTime() > new Date(formatTSTime(end)).getTime())
            };

        });
    });

    return mappedData;

};


export default module.exports = {
    getCachedDeviceData
};
