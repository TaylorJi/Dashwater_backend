import { Request, Response } from "express";
import queryParser from "../../helpers/timestreamAPI/functions/queryParser";
import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";
// import TimestreamModel from "../../models/timestreamAPI/TimestreamModel";
import CircleGraphModel from "../../models/circle_graph/CircleGraphModel";
import TimestreamCacheModel from "../../models/timestreamAPI/TimestreamCacheModel";


// const testRoute = async (req: Request, res: Response) => {
//     console.log(req)
//     CircleGraphModel.testRoute()
//     return res.status(200).json({ message: "Success." });
// };

const getGraphData = async (
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
      const response = await CircleGraphModel.getGraphHistory(deviceIds, measureName, start, end);
  
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

export default module.exports = {
    getGraphData,
    getCachedDeviceData
};