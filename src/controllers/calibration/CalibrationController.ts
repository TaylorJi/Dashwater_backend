import { Request, Response } from "express";

import CalibrationModel from "../../models/calibration/CalibrationModel";

const getSensorCalibrationPoints = async (req: Request, res: Response) => {

    const { sensorId } = req.body;
    console.log(sensorId);

    const response = await CalibrationModel.getSensorCalibrationPoints(sensorId);

    if (response) {
        res.status(200).json({ data: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
}

export default module.exports = {
    getSensorCalibrationPoints
}
