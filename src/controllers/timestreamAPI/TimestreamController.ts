import { Request, Response } from "express";
import TimestreamModel from "../../models/timestreamAPI/TimestreamModel";
import sqlQueries from "../../helpers/timestreamAPI/constants/sqlQueries";
import queryParser from "../../helpers/timestreamAPI/functions/queryParser";

const getAllDeviceIds = async (req: Request, res: Response) => {
  try {
    if (!req.body) res.status(400).json({ error: "Cannot process request." });
    else {
      const response = await TimestreamModel.getAllDeviceIds(
        sqlQueries.DEVICE_IDS
      );
      if (response)
        res.status(200).json({ data: queryParser.parseQueryResult(response) });
      else res.status(404).json({ error: "Not found." });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// /current/?buoyId=1,12,4,5
const getCurrentResource = async (
  req: Request<never, never, never, { buoyIdList: string }>,
  res: Response
) => {
  try {
    const { buoyIdList } = req.query;
    if (!buoyIdList)
      res.status(400).json({ error: "Incomplete request, check buoy id." });
    else {
      const response = await TimestreamModel.getDeviceInfo(buoyIdList);
      if (response)
        res.status(200).json({ data: queryParser.parseQueryResult(response) });
      else res.status(404).json({ error: "Not found." });
    }
  } catch (err) {
    return err;
  }
};

export default module.exports = {
  getAllDeviceIds,
  getCurrentResource,
};
