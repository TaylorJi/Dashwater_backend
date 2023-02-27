import Device from "../../config/schemas/Device";

const createDevice = async (id: Number, latitude: String, longitude: String) => {
    try {
        console.log("model");
        console.log(id);
        console.log(latitude);
        console.log(longitude);
        console.log("leaving model");

        const newDevice = await Device.create({ "id": id, "latitude": latitude, "longitude": longitude });

        console.log("leaving model");
        console.log(newDevice);


        if (newDevice) {
            return newDevice;
        }
        return null;

    } catch (err) {
        return null;
    }
}



export default module.exports = {
    createDevice
}