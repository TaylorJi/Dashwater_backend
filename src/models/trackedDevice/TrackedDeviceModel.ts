import Device from "../../config/schemas/Device";
import TrackedDevice from "../../config/schemas/TrackedDevice";
import User from "../../config/schemas/User";

const getAllDevices = async (userId: String) => {
    try {
        const allDevices = await TrackedDevice.find({"userId": userId}).select('userId deviceId');

        if (allDevices.length > 0) {
            return allDevices;
        }
        return null;
    } catch (err) {
        return null;
    }
}

const createTrackedDevice = async (userId: String, deviceId: Number) => {
    try {
        const newDevice = await TrackedDevice.create({
            userId: userId,
            deviceId: deviceId
        });

        if (newDevice) {
            return newDevice;
        }
        return null;
    } catch (err) {
        return null;
    }
}

// This is used in the controller to verify that both userId and deviceId exist. This could be done in the createTrackedDevices 
// function, but then we wouldn't be able to display a custom error message
const verifyIdCombo = async (userId: String, deviceId: Number) => {
    try{
        const device = await Device.findOne({"deviceId": deviceId})
        const user = await User.findOne({"_id": userId})
        if(!user || !device) {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}

const deleteTrackedDevice = async (userId: String, deviceId: String) => {
    try {
        const deletedDevice = await TrackedDevice.findOneAndDelete({"userId": userId, "deviceId": deviceId});

        if (deletedDevice) {
            return true;
        }
        return null;
    } catch (err) {
        return null;
    }
}

const deleteAllTrackedDevices = async (userId: String) => {
    try {
        const deletedDevices = await TrackedDevice.deleteMany({"userId": userId});

        if (deletedDevices.deletedCount > 0) {
            return true;
        }
        return null;
    } catch (err) {
        return null;
    }
}

export default module.exports = {
    getAllDevices,
    createTrackedDevice,
    deleteTrackedDevice,
    deleteAllTrackedDevices,
    verifyIdCombo
};