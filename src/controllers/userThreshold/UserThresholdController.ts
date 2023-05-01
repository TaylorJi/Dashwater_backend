import { Request, Response } from "express";

import UserThresholdModel from "../../models/userThreshold/UserThresholdModel";


const createUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId, metricList } = req.body;

    if (!userId || !deviceId) {
        return res.status(400).json({ message: "Invalid request: user ID, and device ID are required." });
    } else {

        const metricsToStore = await UserThresholdModel.verifyUserThresholdDocument(userId, deviceId, metricList);
        if (metricsToStore === null) {
            return res.status(400).json({ message: "Invalid request: Please check user ID, device ID, and metric values you enter again." })
        }

        const response = await UserThresholdModel.createUserThreshold( userId, deviceId, metricsToStore );

        if (response) {
            return res.status(200).json({ text: response });
        } else {
            return res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const updateUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId, metricList } = req.body;

    const invalidMetrics = metricList ? Object.keys(metricList).filter((metric) => metricList[metric].customMin > metricList[metric].customMax) : null

    if (!userId || !deviceId || metricList === undefined || Object.keys(metricList).length === 0 || Object.keys(metricList).length > 12 || (invalidMetrics !== null && invalidMetrics.length > 0)) {
        res.status(400).json({ message: "Invalid request: user ID, device ID and metrics to update are required." })
    } else {
        const metricsToUpdate: metricList = {}
        for(let i = 0; i < Object.keys(metricList).length; i++) {
            metricsToUpdate[`metricList.${Object.keys(metricList)[i]}`] = metricList[Object.keys(metricList)[i]]
        }

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


const getSingleMetricUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId, metric } = req.body;

    if (!userId || !deviceId || !metric) {
        res.status(400).json({ message: "Invalid request: user ID, device ID and metric are required." });
    } else {
        const response = await UserThresholdModel.getSingleMetricUserThreshold( userId, deviceId, metric );

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
    getUserThresholdList,
    getSingleMetricUserThreshold
}