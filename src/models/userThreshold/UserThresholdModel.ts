import UserThreshold from "../../config/schemas/UserThreshold";

const createUserThreshold = async (threshold: userThresholdType) => {
    try {

        const newUserThreshold = await UserThreshold.create(threshold);

        if (newUserThreshold) {
            return newUserThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const updateUserThreshold = async (newThresholdValues: userThresholdType) => {
    try {
        const updatedUserThreshold = await UserThreshold.findOneAndUpdate(
            { "userId": newThresholdValues.userId, "sensorId": newThresholdValues.sensorId }, 
            newThresholdValues, 
            {new: true, upsert: true});

        if (updatedUserThreshold) {
            return updatedUserThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const deleteUserThreshold = async (userId: string, sensorId: number) => {
    try {
        const deletedUserThreshold = await UserThreshold.findOneAndDelete({ "userId": userId, "sensorId": sensorId });

        if (deletedUserThreshold) {
            return deletedUserThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getUserThresholdList = async (userId: string) => {
    try {
        const userThresholdList = await UserThreshold.find({ "userId": userId });

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


const getUserThresholdsByDevice = async (userId: string, deviceId: number) => {
    try {
        const deviceThresholdsList = await UserThreshold.find({ "userId": userId, "deviceId": deviceId });
        if (deviceThresholdsList) {
            return deviceThresholdsList
        }
        return null;
    } catch (_err) {
        return null;
    }
}


export default module.exports = {
    createUserThreshold,
    updateUserThreshold,
    deleteUserThreshold,
    getUserThresholdList,
    getSingleMetricUserThreshold,
    getUserThresholdsByDevice
}