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









export default module.exports = {
    createDevice,
    updateDevice
}