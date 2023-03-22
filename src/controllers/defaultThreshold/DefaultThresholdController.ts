import { Request, Response } from "express";

import DefaultThresholdModel from "../../models/defaultThreshold/DefaultThresholdModel";


const createDefaultThreshold = async (req: Request, res: Response) => {

    const { metric, defaultMin, defaultMax } = req.body;

    if (!metric || !defaultMin || !defaultMax) {
        res.status(400).json({ message: "Invalid request: metric, default minimum and default maximum values are required." });
    } else {
        const response = await DefaultThresholdModel.createDefaultThreshold( metric, defaultMin, defaultMax );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const updateDefaultThreshold = async (req: Request, res: Response) => {

    const { metric, defaultMin, defaultMax } = req.body;

    if (!metric || (!defaultMin && !defaultMax)) {
        res.status(400).json({ message: "Invalid request: metric value and at least one of default minimum, default maximum values are required." });
    } else {
        const updateData: { [key: string]: number } = {};

        if (defaultMin) {
            updateData["defaultMin"] = defaultMin;
        }

        if (defaultMax) {
            updateData["defaultMax"] = defaultMax;
        }

        const response = await DefaultThresholdModel.updateDefaultThreshold( metric, updateData );

        if (response) {
            res.status(200).json({ text: response })
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }

}


const deleteDefaultThreshold = async (req: Request, res: Response) => {

    const metric = req.body.metric;

    if (!metric) {
        res.status(400).json({ message: "Invalid request: metric is required." });
    } else {
        const response = await DefaultThresholdModel.deleteDefaultThreshold( metric );

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
}


const getAllDefaultThresholds = async (_req: Request, res: Response) => {

    const response = await DefaultThresholdModel.getAllDefaultThresholds();

    if (response) {
        res.status(200).json({ text: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}






export default module.exports = {
    createDefaultThreshold,
    updateDefaultThreshold,
    deleteDefaultThreshold,
    getAllDefaultThresholds
}