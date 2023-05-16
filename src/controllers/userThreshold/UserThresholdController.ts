import { Request, Response } from "express";

import UserThresholdModel from "../../models/userThreshold/UserThresholdModel";


const createUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId, metricList } = req.body;

    if (!userId || !deviceId) {
        return res.status(400).json({ message: "Invalid request: user ID, and device ID are required." });
    } else {

        const metricsToStore = await UserThresholdModel.verifyUserThresholdDocument(userId, deviceId, metricList, true);
        if (!metricsToStore) {
            return res.status(400).json({ message: "Invalid request: Please make sure that you entered correct user ID, device ID, and check that you did not enter more than 12 metric values (minimum value < maximum value)." })
        }

        const response = await UserThresholdModel.createUserThreshold( userId, deviceId, metricsToStore );

        if (response) {
            return res.status(200).json({ data: response });
        } else {
            return res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const updateUserThreshold = async (req: Request, res: Response) => {

    const { userId, deviceId, metricList } = req.body;

    if (!userId || !deviceId || metricList === undefined || Object.keys(metricList).length === 0) {
        return res.status(400).json({ message: "Invalid request: user ID, device ID and metrics to update are required." })
    } else {

        const metricsToStore = await UserThresholdModel.verifyUserThresholdDocument(userId, deviceId, metricList, false);
        if (metricsToStore === null) {
            return res.status(400).json({ message: "Invalid request: Please make sure that you entered correct user ID, device ID, and check that you did not enter more than 12 metric values (minimum value < maximum value)." })
        }

        const metricsToUpdate = Object.keys(metricList).reduce((json:{[key: string]: metric} , metric) => (json[`metricList.${metric}`] = metricList[metric], json), {})

        const response = await UserThresholdModel.updateUserThreshold( userId, deviceId, metricsToUpdate );

        if (response) {
            return res.status(200).json({ data: response });
        } else {
            return res.status(500).json({ message: "There was an error with the request." });
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
            res.status(200).json({ data: response });
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
            res.status(200).json({ data: response });
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
            res.status(200).json({ data: response });
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