import { Request, Response } from "express";

import DeviceModel from "../../models/device/DeviceModel";


const createDevice = async (req: Request, res: Response) => {

    const { id, latitude, longitude } = req.body;

    if (!id || !latitude || !longitude ) {
        res.status(400).json({ message: "Invalid request: id, latitude and longitude information of the device is required." });
    } else {
        const response = await DeviceModel.createDevice( id, latitude, longitude );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


// I think only "Admin" type users should have access to this operation. So, should I check if the user admin or not here?
const updateDevice = async (req: Request, res: Response) => {

    const { id, latitude, longitude } = req.body;

    if (!id || !latitude || !longitude ) {
        res.status(400).json({ message: "Invalid request: id, latitude and longitude information of the device is required." });
    } else {
        const response = await DeviceModel.updateDevice( id, latitude, longitude );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


// I think only "Admin" type users should have access to this operation. So, should I check if the user admin or not here?
const deleteDevice = async (req: Request, res: Response) => {
    const id = req.body.id;

    if (!id) {
        res.status(400).json({ message: "Invalid request: device id is required." });
    } else {
        const response = await DeviceModel.deleteDevice( id );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const getAllDevices = async (_req: Request, res: Response) => {

    const response = await DeviceModel.getAllDevices();

    if (response) {
        res.status(200).json({ text: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}






export default module.exports = {
    createDevice,
    updateDevice,
    deleteDevice,
    getAllDevices
}