import Device from "../../config/schemas/Device";

const createDevice = async (deviceId: Number, coordinates: [Number]) => {
    try {
        const newDevice = await Device.create({ "deviceId": deviceId, "location.coordinates": coordinates });

        if (newDevice) {
            return newDevice;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const updateDevice = async (deviceId: Number, coordinates: [Number]) => {
    try {

        const updatedDevice = await Device.findOneAndUpdate({ "deviceId": deviceId }, { "location.coordinates": coordinates }, {new: true})
            .select({ "deviceId": 1, "location.coordinates": 1, "_id": 0 });

        if (updatedDevice) {
            return updatedDevice;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const deleteDevice = async (deviceId: Number) => {
    try {
        const deletedDevice = await Device.findOneAndDelete({ "deviceId": deviceId }).select({ "deviceId": 1, "location.coordinates": 1, "_id": 0 });

        if (deletedDevice) {
            return deletedDevice;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getAllDevices = async () => {
    try {
        const devices = await Device.find({}).select({ "deviceId": 1, "location.coordinates": 1, "_id": 0 });

        if (devices.length !== 0) {
            return devices;
        }
        return false;
    } catch (err) {
        return null;
    }
}


const getSingleDevice = async (deviceId: Number) => {
    try {
        const device = await Device.findOne({ "deviceId": deviceId }).select({ "deviceId": 1, "location.coordinates": 1, "_id": 0 });

        if (device) {
            return device;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getDevicesWithinRadius = async (coordinates: [Number], radius: Number) => {
    try {

        const devices = await Device.find({
            location: {
                $near: {
                    $geometry: {
                        "type": "Point",
                        "coordinates": coordinates
                    },
                    $maxDistance: radius // Radius should be meter
                }
            }
        }).select({ "deviceId": 1, "location.coordinates": 1, "_id": 0 });

        if (devices.length !== 0) {
            return devices;
        }
        return false;

    } catch (err) {
        return null;
    }
}

export default module.exports = {
    createDevice,
    updateDevice,
    deleteDevice,
    getAllDevices,
    getSingleDevice,
    getDevicesWithinRadius
}