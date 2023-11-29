import { Request, Response } from "express";

import DeviceModel from "../../models/device/DeviceModel";


const createDevice = async (req: Request, res: Response) => {

    const { deviceId, coordinates, metricList } = req.body;

    if (deviceId == null || coordinates.length !== 2 ) {
        res.status(400).json({ message: "Invalid request: id, and location (longitude, latitude) information of the device is required." });
    } else {
        const response = await DeviceModel.createDevice( deviceId, coordinates, metricList );

        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const updateDevice = async (req: Request, res: Response) => {

    const { deviceId, coordinates, metricList } = req.body;

    if (!deviceId || (!coordinates && !metricList) || (coordinates && coordinates.length !== 2) || (metricList && Object.keys(metricList).length === 0)) {
        res.status(400).json({ message: "Invalid request: id, and device information to be updated (location [longitude, latitude], metric name) is required." });
    } else {
        const updateData: deviceUpdateDataType = {};

        if (coordinates) {
            updateData.location = {type: "Point", coordinates: coordinates}
        }

        if (metricList) {
            Object.keys(metricList).forEach(metric => {
                updateData[`metricList.${metric}`] = metricList[metric]
            })
        }


        const response = await DeviceModel.updateDevice( deviceId, updateData );

        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const deleteDevice = async (req: Request, res: Response) => {

    const deviceId = req.body.deviceId;

    if (!deviceId) {
        res.status(400).json({ message: "Invalid request: device id is required." });
    } else {
        const response = await DeviceModel.deleteDevice( deviceId );

        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const getAllDevices = async (_req: Request, res: Response) => {

    const response = await DeviceModel.getAllDevices();

    if (response) {
        res.status(200).json({ data: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}


const getSingleDevice = async (req: Request, res: Response) => {

    const deviceId = req.body.deviceId;

    if (!deviceId) {
        res.status(400).json({ message: "Invalid request: device id is required." });
    } else {
        const response = await DeviceModel.getSingleDevice( deviceId );

        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const getDevicesWithinRadius = async (req: Request, res: Response) => {

    const { coordinates, radius } = req.body;

    if (coordinates.length !== 2 || !radius) {
        res.status(400).json({ message: "Invalid request: location coordinates (longitude, latitude) and radius information are required." })
    } else {
        const response = await DeviceModel.getDevicesWithinRadius( coordinates, radius );

        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(500).json({ meesage: "There was an error with the request." });
        }
    }

}

const getAllDevicesSettings = async (req: Request, res: Response) => {
    try {
        const response = await DeviceModel.getAllDevicesSettings(req.body.Cookie);
        console.log("Response from getAllDevicesSettings:", response);
        res.status(200).json({ data: response });
    } catch (error) {
        console.error("Error in getAllDevicesSettings", error);
        res.status(500).json({ message: "There was an error with the request.", error: (error as Error).message });
    }
}

const updateDeviceSettings = async(req: Request, res: Response) => {
    console.log(req.body); // Log the request body
    const device: deviceSettingType = req.body.newSettings;
    const sessionId: string = req.body.sessionId;

    const response = await DeviceModel.updateDeviceSettings(device, sessionId);
    if (response) {
        res.status(200).json({ message: `Device update successful!`}); // Include response in the response body
    } else {
        res.status(500).json({ message: "There was an error with the" })
    }
}


export default module.exports = {
    createDevice,
    updateDevice,
    deleteDevice,
    getAllDevices,
    getSingleDevice,
    getDevicesWithinRadius,
    getAllDevicesSettings,
    updateDeviceSettings
}