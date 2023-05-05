import AppCache from "../cache/AppCache";
import { metricUnitRef } from "../cache/timestreamConstants";

const getCachedDeviceData = async () => {

    try {
        const cachedData = await AppCache.getDeviceData();

        if (cachedData) {

            const mappedData: any = {};

            Object.keys(cachedData).map((device) => {

                mappedData[device] = [];

                Object.keys(cachedData[device]).map((metric: any) => {

                    const newMeasure = {
                        measureName: metric,
                        xAxisName: metricUnitRef[metric]['xAxisName'],
                        yAxisName: metricUnitRef[metric]['yAxisName'],
                        data: cachedData[device][metric]
                    };

                    mappedData[device].push(newMeasure);

                });

            });

            return mappedData;
        }

        return null;

    } catch (err) {
        console.log(err);
        return null;
    }

};

export default module.exports = {
    getCachedDeviceData
};
