import { Request, Response } from "express";
import TrackedDeviceModel from "../../models/trackedDevice/TrackedDeviceModel";

const getAllTrackedDevices = async (req: Request, res: Response) => {
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
        res.status(200).json({ text: "Tracked device created." });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}

const deleteTrackedDevice = async (req: Request, res: Response) => {
    const { userId, deviceId } = req.body;

    if (!userId || !deviceId) {
        res.status(400).json({message: "Invalid request: user ID and device ID are required."});
    }

    const response = await TrackedDeviceModel.deleteTrackedDevice(userId, deviceId);
    if (response) {
        res.status(200).json({ message: "Tracked device deleted." });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}

const deleteAllTrackedDevices = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    if (!userId) {
        res.status(400).json({message: "Invalid request: ID is required."});
    }

    const response = await TrackedDeviceModel.deleteAllTrackedDevices(userId);
    if (response) {
        res.status(200).json({ message: "All tracked devices deleted for this user." });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}

export default module.exports = {
    getAllTrackedDevices,
    createTrackedDevice,
    deleteTrackedDevice,
    deleteAllTrackedDevices
};