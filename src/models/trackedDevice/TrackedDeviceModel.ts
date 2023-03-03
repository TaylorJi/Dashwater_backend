import TrackedDevice from "../../config/schemas/TrackedDevice";

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

const createTrackedDevice = async (userId: String, deviceId: String) => {
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
    deleteAllTrackedDevices
};