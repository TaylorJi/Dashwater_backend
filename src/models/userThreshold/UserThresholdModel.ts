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
    /**
     * Not currently in use 
     */
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
    /**
     * Not currently in use 
     */
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
    getUserThresholdsByDevice
}