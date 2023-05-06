import AppCache from "../cache/AppCache";
import { metricUnitRef } from "../cache/timestreamConstants";

const getCachedDeviceData = async () => {

    try {
        const cachedData = await AppCache.getDeviceData();

        if (cachedData) {

            const mappedData: any = {};

            Object.keys(cachedData).map((device) => {

                mappedData[device] = Object.keys(cachedData[device]).map((metric: any) => {
                    return {
                        measureName: metric,
                        xAxisName: metricUnitRef[metric]['xAxisName'],
                        yAxisName: metricUnitRef[metric]['yAxisName'],
                        data: cachedData[device][metric]
                    };

                });
            });

            return mappedData;
        }

        return null;

    } catch (_err) {
        return null;
    }

};

export default module.exports = {
    getCachedDeviceData
};
