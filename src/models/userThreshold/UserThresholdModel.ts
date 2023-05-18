import UserThreshold from "../../config/schemas/UserThreshold";

import User from "../../config/schemas/User";
import Device from "../../config/schemas/Device";
import DefaultThreshold from "../../config/schemas/DefaultThreshold";

const createUserThreshold = async (userId: string, deviceId: number, metricList: metricList) => {
    try {

        const newUserThreshold = await UserThreshold.create({ "userId": userId, "deviceId": deviceId, "metricList": metricList });

        if (newUserThreshold) {
            return newUserThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const updateUserThreshold = async (userId: string, deviceId: number, metricsToUpdate: metricList) => {
    try {
        const updatedUserThreshold = await UserThreshold.findOneAndUpdate({ "userId": userId, "deviceId": deviceId }, metricsToUpdate, {new: true});

        if (updatedUserThreshold) {
            return updatedUserThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const deleteUserThreshold = async (userId: string, deviceId: number) => {
    try {
        const deletedUserThreshold = await UserThreshold.findOneAndDelete({ "userId": userId, "deviceId": deviceId });

        if (deletedUserThreshold) {
            return deletedUserThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getUserThresholdList = async (userId: string, deviceId: number) => {
    try {
        const userThresholdList = await UserThreshold.findOne({ "userId": userId, "deviceId": deviceId });

        if (userThresholdList) {
            return userThresholdList;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getSingleMetricUserThreshold = async (userId: string, deviceId: number, metric: string) => {
    try {
        const metricUserThreshold = await UserThreshold.findOne({ "userId": userId, "deviceId": deviceId })
                                                            .select({ "userId": 1, "deviceId": 1, [`metricList.${metric}`]: 1 });

        if (metricUserThreshold) {
            return metricUserThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const verifyUserThresholdDocument = async ( userId: string, deviceId: number, metricList: metricList | undefined, isNewDocument: boolean ) => {
    try {

        const user = await User.findOne({ "_id": userId });
        const device: deviceType | null =  await Device.findOne({ "deviceId": deviceId });
        if(!user || !device) {
            return null;
        }

        if (metricList !== undefined && Object.keys(metricList).length > 12) {
            return null;
        }

        const invalidMetrics = metricList ? Object.keys(metricList).filter((metric) => metricList[metric].customMin > metricList[metric].customMax) : null

        if (invalidMetrics !== null && invalidMetrics.length > 0) {
            return null;
        }

        if (isNewDocument) {
            const defaultThresholdValues = await DefaultThreshold.find({});
            const defaultThresholdValuesJSON = defaultThresholdValues.reduce((json: {[key: string]: defaultThreshold}, metricObj) => (json[metricObj.metric] = metricObj, json), {})

            const metricsToStore: metricList = {};

            Object.keys(device.metricList).forEach(metric => {
                if (device.metricList[metric].isAvailable) {
                    if (metricList !== undefined && metricList[metric]) {
                        metricsToStore[metric] = metricList[metric]
                    } else if (defaultThresholdValuesJSON[metric]) {
                        metricsToStore[metric] = { customMin: defaultThresholdValuesJSON[metric].defaultMin,
                                                   customMax: defaultThresholdValuesJSON[metric].defaultMax,
                                                   isWarning: true };
                    }
                }
            });

            return metricsToStore;
        } else {
            return metricList;
        }

    } catch (err) {
        return null;
    }
}




export default module.exports = {
    createUserThreshold,
    updateUserThreshold,
    deleteUserThreshold,
    getUserThresholdList,
    getSingleMetricUserThreshold,
    verifyUserThresholdDocument
}