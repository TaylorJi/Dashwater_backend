import AppCache from "../cache/AppCache";
import { logDataRef, metricUnitRef } from "../cache/timestreamConstants";
import { formatTSTime } from "../cache/timestreamHelpers";

const getCachedDeviceData = async (end: string) => {

    try {
        const cachedData: any = await AppCache.getDeviceData();

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

const getCachedLogData = async (end: string) => {

    try {
        const cachedData: any = await AppCache.getDeviceData();

        if (cachedData) {
            return remapLogDataFromCache(cachedData, end);
        }

        return null;

    } catch (_err) {
        return null;
    }

};

const remapLogDataFromCache = (cachedData: any, end?: string) => {

    let mappedData: any[] = [];

    Object.keys(cachedData).map((device) => {

        // have to start a new array to keep track of all devices
        const deviceData: any[] = [];

        Object.keys(cachedData[device]).map((metric: string) => {

            cachedData[device][metric].map((measurement: any, index: number) => {

                if (deviceData.length === index) {
                    // it doesn't exist and must be created

                    deviceData.push({
                        'id': Number(device),
                        'time': measurement['time'],
                        [logDataRef[metric]]: measurement['value']
                    });

                } else {

                    deviceData[index] = {
                        ...deviceData[index],
                        [logDataRef[metric]]: measurement['value']
                    };
                }

            });

        });

        mappedData = [...mappedData, ...deviceData];

    });

    if (end) {
        mappedData = mappedData.filter((metric: any) =>
            new Date(metric.time).getTime() > new Date(formatTSTime(end)).getTime());
    }

    Object.keys(logDataRef).map((metric) => {

        mappedData.map((measurement) => {

            if (!(logDataRef[metric] in measurement)) {
                measurement[logDataRef[metric]] = -9999;
            }

        });

    });

    return mappedData;

};


export default module.exports = {
    getCachedDeviceData,
    getCachedLogData
};
