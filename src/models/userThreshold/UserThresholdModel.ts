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




export default module.exports = {
    createUserThreshold
}