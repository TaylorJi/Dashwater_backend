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








export default module.exports = {
    createUserThreshold
}