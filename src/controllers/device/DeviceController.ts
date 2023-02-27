import { Request, Response } from "express";

import DeviceModel from "../../models/device/DeviceModel";


const createDevice = async (req: Request, res: Response) => {

    const { id, latitude, longitude } = req.body;

    console.log("controller");
    console.log(req.body);
    console.log(id);
    console.log(latitude);
    console.log(longitude);

    if (!id || !latitude || !longitude ) {
        res.status(400).json({ message: "Invalid request: id, longitude and latitude information of the device is required." });
    } else {
        const response = await DeviceModel.createDevice( id, latitude, longitude );

        console.log(response);

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}



export default module.exports = {
    createDevice
}