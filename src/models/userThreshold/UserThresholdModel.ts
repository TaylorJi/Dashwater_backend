import UserThreshold from "../../config/schemas/UserThreshold";

import mongoose from 'mongoose'


const createUserThreshold = async (userId: mongoose.Schema.Types.ObjectId, deviceId: number, metricList: metricList) => {
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


const updateUserThreshold = async (userId: mongoose.Schema.Types.ObjectId, deviceId: number, metricsToUpdate: metricList) => {
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


const deleteUserThreshold = async (userId: mongoose.Schema.Types.ObjectId, deviceId: number) => {
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


const getUserThresholdList = async (userId: mongoose.Schema.Types.ObjectId, deviceId: number) => {
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


const getSingleMetricUserThreshold = async (userId: mongoose.Schema.Types.ObjectId, deviceId: number, metric: string) => {
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




export default module.exports = {
    createUserThreshold,
    updateUserThreshold,
    deleteUserThreshold,
    getUserThresholdList,
    getSingleMetricUserThreshold
}