import Device from "../../config/schemas/Device";

const createDevice = async (id: Number, latitude: String, longitude: String) => {
    try {

        const newDevice = await Device.create({ "id": id, "latitude": latitude, "longitude": longitude });


        if (newDevice) {
            return newDevice;
        }
        return null;

    } catch (err) {
        return null;
    }
}


const updateDevice = async (id: Number, latitude: String, longitude: String) => {
    try {

        const updatedDevice = await Device.findOneAndUpdate({ "id": id }, { "latitude": latitude, "longitude": longitude });

        if (updatedDevice) {
            return updateDevice;
        }
        return null;

    } catch (err) {
        return null;
    }
}


const deleteDevice = async (id: Number) => {
    try {
        const deletedDevice = await Device.findOneAndDelete({ "id": id });

        if (deletedDevice) {
            return deletedDevice;
        }
        return null;

    } catch (err) {
        return null;
    }
}


const getAllDevices = async () => {
    try {
        const devices = await Device.find({});

        if (devices.length !== 0) {
            return devices;
        }
        return null;
    } catch (err) {
        return null;
    }
}


const getSingleDevice = async (id: Number) => {
    try {
        const device = await Device.findOne({ "id": id });

        if (device) {
            return device;
        }
        return null;

    } catch (err) {
        return null;
    }
}








export default module.exports = {
    createDevice,
    updateDevice,
    deleteDevice,
    getAllDevices,
    getSingleDevice
}