import { Request, Response } from "express";

import UserThresholdModel from "../../models/userThreshold/UserThresholdModel";

const createUserThreshold = async (req: Request, res: Response) => {
  const { userId, deviceId, metricId, min, max } = req.body;
  console.log("called");
  if (!userId || !deviceId || !metricId || !min || !max) {
    res.status(400).json({ message: "Invalid request: Missing required info" });
  } else {
    const response = await UserThresholdModel.createUserThreshold(
      userId,
      deviceId,
      metricId,
      min,
      max
    );

    if (response) {
      res.status(200).json({ text: response });
    } else {
      res.status(500).json({ message: "There was an error with the request." });
    }
  }
};

const updateUserThreshold = async (req: Request, res: Response) => {
  const { userId, deviceId, metricId, min, max } = req.body;

  if (!userId || !deviceId || !metricId || !min || !max) {
    res.status(400).json({ message: "Invalid request: Missing required info" });
  } else {
    const response = await UserThresholdModel.updateUserThreshold(
      userId,
      deviceId,
      metricId,
      min,
      max
    );

    if (response) {
      res.status(200).json({ text: response });
    } else {
      res.status(500).json({ message: "There was an error with the request." });
    }
  }
};
export default module.exports = {
  createUserThreshold,
  updateUserThreshold,
};
