import { Request, Response } from "express";

import UserThresholdModel from "../../models/userThreshold/UserThresholdModel";


const createUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId, metricList } = req.body;

    // If metricList greater than the number of metrics we can track send 400 (3rd test case) (metricList.length() > metricCount)
    if (!userId || !deviceId) {
        res.status(400).json({ message: "Invalid request: user ID, and device ID are required." });
    } else {
        const response = await UserThresholdModel.createUserThreshold( userId, deviceId, metricList );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const updateUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId, metricList } = req.body;

    const metricsToUpdate: metricList = {}
    for(let i = 0; i < Object.keys(metricList).length; i++) {
        metricsToUpdate[`metricList.${Object.keys(metricList)[i]}`] = metricList[Object.keys(metricList)[i]]
    }

    if (!userId || !deviceId || Object.keys(metricList).length === 0) {
        res.status(400).json({ message: "Invalid request: user ID, device ID and metrics to update are required." })
    } else {
        const response = await UserThresholdModel.updateUserThreshold( userId, deviceId, metricsToUpdate );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const deleteUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId } = req.body;

    if (!userId || !deviceId) {
        res.status(400).json({ message: "Invalid request: user ID, and device ID are required." });
    } else {
        const response = await UserThresholdModel.deleteUserThreshold( userId, deviceId );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const getUserThresholdList = async (req: Request, res: Response) => {

    const { userId, deviceId } = req.body;

    if (!userId || !deviceId) {
        res.status(400).json({ message: "Invalid request: user ID, and device ID are required." });
    } else {
        const response = await UserThresholdModel.getUserThresholdList( userId, deviceId );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}





export default module.exports = {
    createUserThreshold,
    updateUserThreshold,
    deleteUserThreshold,
    getUserThresholdList
}