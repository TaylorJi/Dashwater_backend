import { Request, Response } from "express";
import TrackedDeviceModel from "../../models/trackedDevice/TrackedDeviceModel";
// import Device from "../../config/schemas/Device";
// import User from "../../config/schemas/User";

const getAllTrackedDevices = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({message: "Invalid request: ID is required."});
    }

    const response = await TrackedDeviceModel.getAllDevices(userId);
    if (response) {
        return res.status(200).json({ text: response });
    } else {
        return res.status(500).json({ message: "There was an error with the request." });
    }
}

const createTrackedDevice = async (req: Request, res: Response) => {
    const { userId, deviceId } = req.body;

    if (!userId || !deviceId) {
        return res.status(400).json({message: "Invalid request: user ID and device ID are required."});
    }

    const verifiedCombo = await TrackedDeviceModel.verifyIdCombo(userId, deviceId)
    if(!verifiedCombo) {
        return res.status(400).json({message: "Invalid request: could not find user and/or device with the given IDs."});
    }

    const response = await TrackedDeviceModel.createTrackedDevice(userId, deviceId);
    if (response) {
        return res.status(200).json({ text: "Tracked device created." });
    } else {
        return res.status(500).json({ message: "There was an error with the request." });
    }
}

const deleteTrackedDevice = async (req: Request, res: Response) => {
    const { userId, deviceId } = req.body;

    if (!userId || !deviceId) {
        return res.status(400).json({message: "Invalid request: user ID and device ID are required."});
    }

    const response = await TrackedDeviceModel.deleteTrackedDevice(userId, deviceId);
    if (response) {
        return res.status(200).json({ message: "Tracked device deleted." });
    } else {
        return res.status(500).json({ message: "There was an error with the request." });
    }
}

const deleteAllTrackedDevices = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({message: "Invalid request: ID is required."});
    }

    const response = await TrackedDeviceModel.deleteAllTrackedDevices(userId);
    if (response) {
        return res.status(200).json({ message: "All tracked devices deleted for this user." });
    } else {
        return res.status(500).json({ message: "There was an error with the request." });
    }
}

export default module.exports = {
    getAllTrackedDevices,
    createTrackedDevice,
    deleteTrackedDevice,
    deleteAllTrackedDevices
};