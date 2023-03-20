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




export default module.exports = {
    createUserThreshold,
    updateUserThreshold
}