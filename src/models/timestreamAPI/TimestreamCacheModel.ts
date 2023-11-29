// import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";
// import queryParser from "../../helpers/timestreamAPI/functions/queryParser";
import AppCache from "../cache/AppCache";
import {logDataRef } from "../cache/timestreamConstants"; // DEVICE_IDS, VALUE_NOT_FOUND, metricRef, metricUnitRef, 
import { formatTSTime } from "../cache/timestreamHelpers"; // floorToSecond,
// import TimestreamModel from "./TimestreamModel";

const getCachedDeviceData = async (end: string) => {

    try {
        const cachedData = await AppCache.getDeviceData(end);

        if (cachedData) {
            return remapDeviceDataFromCache(cachedData, end);
        }

        return null;

    } catch (_err) {
        return null;
    }

};

// const getCachedHistoricalHighLow = async () => {
//     try {
//         const cachedData = await AppCache.getHistoricalHighLow();
//         if (cachedData) {
//             return remapHistoricalHighLow(cachedData);
//         }
//         return null;
//     } catch (_err) {
//         return null;
//     }

// };

// const remapHistoricalHighLow = (cachedData: any) => {
//     const mappedData: any = {};

//     Object.keys(cachedData).map((device) => {

//         mappedData[device] = [];

//         Object.keys(cachedData[device]).map((metric: any) => {
//             mappedData[device].push({
//                 metric: metric,
//                 unit: metricUnitRef[metric]['yAxisName'],
//                 low: cachedData[device][metric]['low'],
//                 high: cachedData[device][metric]['high'],
//                 current: AppCache.getCurrentMeasurement(metric, device) ? AppCache.getCurrentMeasurement(metric, device) : VALUE_NOT_FOUND
//             })
//         });
//     });

//     return mappedData;
// };


// const remapDeviceDataFromCache = (cachedData: any, end?: string) => {
//     const mappedData: any = {};

//     Object.keys(cachedData).map((device) => {

//         mappedData[device] = Object.keys(cachedData[device]).map((metric: any) => {
//             return {
//                 measureName: metric,
//                 xAxisName: metricUnitRef[metric]['xAxisName'],
//                 yAxisName: metricUnitRef[metric]['yAxisName'],
//                 data: !end ? cachedData[device][metric] :
//                     cachedData[device][metric].filter((metric: any) =>
//                         new Date(metric.time).getTime() > new Date(formatTSTime(end)).getTime())
//             };

//         });
//     });

//     return mappedData;

// };

const remapDeviceDataFromCache = (cachedData: any, end?: string) => {
    const mappedData: any = {};
    console.log("end: " + end);

    Object.keys(cachedData).map((device) => {

        mappedData[device] = Object.keys(cachedData[device]).map((metric: any) => {
            return {
                measureName: metric,
                xAxisName: 'Time',
                yAxisName: cachedData[device][metric][0].unit,
                data: cachedData[device][metric] 
            };

        });
    });

    return mappedData;

};

const getCachedLogData = async (end: string) => {

    try {
        const cachedData = await AppCache.getDeviceData('12h');

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

// const getTimeStreamDataForRange = async (start: string, end: string) => {

//     try {
//         const startDate = floorToSecond(start);
//         const endDate = floorToSecond(end);

//         const deviceData: any = {};

//         await Promise.all(DEVICE_IDS.map(async (id) => {
//             const parsedDeviceId = queryBuilder.parseDeviceList(id);

//             deviceData[id] = {}

//             await Promise.all(
//                 Object.keys(metricRef).map(async (metric) => {

//                     let fetchedData = await TimestreamModel.getHistoricalData(
//                         parsedDeviceId, metric, startDate, endDate);

//                     if (fetchedData) {

//                         fetchedData = queryParser.parseQueryResult(fetchedData);

//                         if (fetchedData.length > 0) {

//                             deviceData[id][metricRef[metric]] =
//                                 fetchedData.map((datum: any) => {
//                                     return (
//                                         {
//                                             'time': formatTSTime(datum['time']),
//                                             'value': parseFloat(datum['measure_value::double'])
//                                         }
//                                     )
//                                 });
//                         }
//                     }

//                 })
//             );

//         }));

//         if (Object.keys(deviceData).length === 0) {
//             return null;
//         }
//         return deviceData;

//     } catch (_err) {
//         return null;

//     }

// };

// const getCustomRangeData = async (start: string, end: string) => {

//     const timestreamData = await getTimeStreamDataForRange(start, end);

//     if (timestreamData) {
//         return remapDeviceDataFromCache(timestreamData);
//     }

//     return null;

// };

// const getCustomRangeLogData = async (start: string, end: string) => {

//     const timestreamData = await getTimeStreamDataForRange(start, end);

//     if (timestreamData) {
//         return remapLogDataFromCache(timestreamData);
//     }

//     return null;

// };


export default module.exports = {
    getCachedDeviceData,
//     getCachedHistoricalHighLow,
//     remapHistoricalHighLow,
    getCachedLogData,
//     getCustomRangeData,
//     getCustomRangeLogData
};
