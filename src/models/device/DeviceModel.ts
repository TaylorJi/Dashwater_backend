import Device from "../../config/schemas/Device";

const createDevice = async (id: Number, coordinates: [Number]) => {
    try {

        const newDevice = await Device.create({ "id": id, "location.coordinates": coordinates });


        if (newDevice) {
            return newDevice;
        }
        return null;

    } catch (err) {
        return null;
    }
}


const updateDevice = async (id: Number, coordinates: [Number]) => {
    try {

        const updatedDevice = await Device.findOneAndUpdate({ "id": id }, { "location.coordinates": coordinates }, {new: true});

        if (updatedDevice) {
            return updatedDevice;
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
        })

        if (devices.length !== 0) {
            return devices;
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
    getSingleDevice,
    getDevicesWithinRadius
}