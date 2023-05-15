import { Request, Response } from "express";
import TimestreamModel from "../../models/timestreamAPI/TimestreamModel";
import sqlQueries from "../../helpers/timestreamAPI/constants/sqlQueries";
import queryParser from "../../helpers/timestreamAPI/functions/queryParser";
import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";
import TimestreamCacheModel from "../../models/timestreamAPI/TimestreamCacheModel";

//GET request for all device IDs
const getAllBuoyIds = async (_req: Request, res: Response) => {

  const response = await TimestreamModel.getAllBuoyIds(sqlQueries.DEVICE_IDS);

  if (response) {
    res.status(200).json({ data: queryParser.parseQueryResult(response) });

  } else {
    res.status(500).json({ error: "There was an error with your request." });
  }

};

//GET request for current buoy data (based on 365 days)
const getCurrentBuoyData = async (
  req: Request<never, never, never, { buoyIdList: string }>, res: Response) => {

  const { buoyIdList } = req.query;

  if (!buoyIdList) {
    res.status(400).json({ error: "Incomplete request, check buoy id." });

  } else {
    const response = await TimestreamModel.getBuoyData(buoyIdList);

    if (response) {
      res.status(200).json({ data: queryParser.parseQueryResult(response) });

    } else {
      res.status(500).json({ error: "There was an error with your request." });
    }

  }

};

const getBuoyHistory = async (
  req: Request<
    never,
    never,
    never,
    { buoyIdList: string; measureName: string; start: string; end: string }
  >,
  res: Response
) => {

  const { buoyIdList, measureName, start, end } = req.query;

  if (!buoyIdList || !measureName || !start || !end) {
    res.status(400).json({ error: "Invalid request; query is missing values" });

  } else {
    const deviceIds = queryBuilder.parseDeviceList(buoyIdList);
    const response = await TimestreamModel.getHistoricalData(deviceIds, measureName, start, end);

    if (response) {
      res.status(200).json({ data: queryParser.parseQueryResult(response) });

    } else {
      res.status(500).json({ error: "There was an error with your request." });
    }

  }
};

// GET request for buoy data for each buoy id in the list
//  based on the threshold which is a comparator and number,
const getBuoyThreshold = async (
  req: Request<never, never, never,
    {
      buoyIdList: string;
      measureName: string;
      start: string;
      end: string;
      measureValueType: string;
      threshold: number;
    }
  >,
  res: Response) => {

  const { buoyIdList, measureName, start, end, measureValueType, threshold } = req.query;

  if (!buoyIdList || !measureName || !start || !end || !measureValueType || !threshold) {
    res.status(400).json({ error: "Invalid request; query is missing values" });

  } else {
    const deviceIds = queryBuilder.parseDeviceList(buoyIdList);

    const response = await TimestreamModel.getThresholdData(deviceIds, measureName, start, end,
      measureValueType, threshold);

    if (response) {
      res.status(200).json({ data: queryParser.parseQueryResult(response) });

    } else {
      res.status(500).json({ error: "There was an error with your request." });
    }

  }
};

const getCachedDeviceData = async (req: Request, res: Response) => {

  const { end } = req.body;

  const response = await TimestreamCacheModel.getCachedDeviceData(end);

  if (response) {
    res.status(200).json({ data: response });

  } else {
    res.status(500).json({ error: "There was an error with the cache." });
  }

};

const getCachedLogData = async (req: Request, res: Response) => {

  const { end } = req.body;

  const response = await TimestreamCacheModel.getCachedLogData(end);

  if (response) {
    res.status(200).json({ data: response });

  } else {
    res.status(500).json({ error: "There was an error with the cache." });
  }

};


export default module.exports = {
  getAllBuoyIds,
  getCurrentBuoyData,
  getBuoyHistory,
  getBuoyThreshold,
  getCachedDeviceData,
  getCachedLogData
};
