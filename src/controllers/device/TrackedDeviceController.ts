import { Request, Response } from "express";
import TrackedDeviceModel from "../../models/device/TrackedDeviceModel";

const getAllDevices = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    if (!userId) {
        res.status(400).json({message: "Invalid request: ID is required."});
    }

    const response = await TrackedDeviceModel.getAllDevices(userId);
    if (response) {
        res.status(200).json({ text: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}

const createTrackedDevice = async (req: Request, res: Response) => {
    const { userId, deviceId } = req.body;

    if (!userId || !deviceId) {
        res.status(400).json({message: "Invalid request: user ID and device ID are required."});
    }

    const response = await TrackedDeviceModel.createTrackedDevice(userId, deviceId);
    if (response) {
        res.status(200).json({ text: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}

export default module.exports = {
    getAllDevices,
    createTrackedDevice
};