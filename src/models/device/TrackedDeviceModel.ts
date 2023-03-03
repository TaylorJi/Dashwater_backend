import TrackedDevice from "../../config/schemas/TrackedDevice";

const getAllDevices = async (userId: String) => {
    try {
        const allDevices = await TrackedDevice.find({"userId": userId});

        if (allDevices.length > 0) {
            return allDevices;
        }
        return null;
    } catch (err) {
        return null;
    }
}

const createTrackedDevice = async (UserId: String, deviceId: String) => {
    try {
        const newDevice = await TrackedDevice.create({
            userId: UserId,
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

export default module.exports = {
    getAllDevices,
    createTrackedDevice
};