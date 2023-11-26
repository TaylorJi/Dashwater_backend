import { Request, Response } from "express";
import TimestreamModel from "../../models/timestreamAPI/TimestreamModel";
import sqlQueries from "../../helpers/timestreamAPI/constants/sqlQueries";
import queryParser from "../../helpers/timestreamAPI/functions/queryParser";
import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";
import TimestreamCacheModel from "../../models/timestreamAPI/TimestreamCacheModel";

interface deviceSensor {
  sensorUnit: string;
  measureValue: number;
}

//GET request for all device IDs
const getAllBuoyIds = async (_req: Request, res: Response) => {

  const response = await TimestreamModel.getAllBuoyIds(sqlQueries.DEVICE_IDS);

  if (response) {
    console.log(response);
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
    const response = await TimestreamModel.getHistoricalData(deviceIds, measureName); //, start, end

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

// const getCachedLogData = async (req: Request, res: Response) => {

//   const { end } = req.body;

//   const response = await TimestreamCacheModel.getCachedLogData(end);

//   if (response) {
//     res.status(200).json({ data: response });

//   } else {
//     res.status(500).json({ error: "There was an error with the cache." });
//   }

// };

// const getCachedHistoricalHighLow = async (_req: Request, res: Response) => {
//   const response = await TimestreamCacheModel.getCachedHistoricalHighLow();

//   if (response) {
//     res.status(200).json({ data: response });
//   } else {
//     res.status(500).json({ error: "There was an error with the cache." });
//   }
// };

// const getCustomRangeData = async (req: Request, res: Response) => {

//   const { start, end } = req.body;

//   if (!start || !end) {
//     res.status(400).json({ error: "Invalid request; query is missing values" });

//   } else {
//     const response = await TimestreamCacheModel.getCustomRangeData(start, end);

//     if (response) {
//       res.status(200).json({ data: response });

//     } else {
//       res.status(500).json({ error: "There was an error with fetching custom range data." });
//     }
//   }

// };

// const getCustomRangeLogData = async (req: Request, res: Response) => {

//   const { start, end } = req.body;

//   if (!start || !end) {
//     res.status(400).json({ error: "Invalid request; query is missing values" });

//   } else {
//     const response = await TimestreamCacheModel.getCustomRangeLogData(start, end);

//     if (response) {
//       res.status(200).json({ data: response });

//     } else {
//       res.status(500).json({ error: "There was an error with fetching custom range log data." });
//     }
//   }

// };

const test = async (_req: Request, res: Response) => {
  console.log("backend controller test is being called")

  const response = await TimestreamModel.test();

  if (response) {
    res.status(200).json({ data: queryParser.parseQueryResult(response) });

  } else {
    res.status(500).json({ error: "There was an error with your request." });
  }
}

const getHistoricalHighLow = async (req: Request, res: Response) => {
  console.log("backend controller test is being called")
  const devices = await TimestreamModel.getAllDevices(); // get all devices

  const deviceName = req.body.device_name;
  const sensor_name = req.body.sensor_name;
  const time = req.body.time;

  const max = await TimestreamModel.getHistoricalHigh(deviceName, sensor_name, time);

  const min = await TimestreamModel.getHistoricalLow(deviceName, sensor_name, time);

  if (devices && max && min) {
    res.status(200).json({ data: { max: max.Rows[0].Data[0].ScalarValue, min: min.Rows[0].Data[0].ScalarValue } });
  } else {
    res.status(500).json({ error: "There was an error with your request." });
  }
}

const getSensors = async (req: Request, res: Response) => {
  const deviceName = req.body.device_name;
  console.log("deviceName is: ----------------------");
  console.log(deviceName);

  const response = await TimestreamModel.getSensors(deviceName);

  if (response) {
    console.log(response);
    res.status(200).json({ data: queryParser.parseQueryResult(response) });

  } else {
    res.status(500).json({ error: "There was an error with your request." });
  }
}

const getData = async (req: Request, res: Response) => {
  const deviceName = req.body.device_name;
  const interval  = req.body.time;
  console.log("deviceName is: ----------------------");
  console.log(deviceName);


  const response = await TimestreamModel.getData(deviceName, interval);

  // const sensor_name = response.Rows[0].sensor_name
  // console.log("first " + response.Rows[0].Data[0].ScalarValue)
  // console.log("second " + response.Rows[0].Data[1].ScalarValue) // sensor_unit
  // console.log("third " + response.Rows[0].Data[2].ScalarValue) // sensor_name
  // console.log("fourth " + response.Rows[0].Data[3].ScalarValue) // measure_value
  // console.log("fifth " + response.Rows[0].Data[4].ScalarValue) // time
  // console.log("sixth " + response.Rows[0].Data[5].ScalarValue) // measure_value


  const deviceSensorArray: { [key: string]: deviceSensor } = {};
  if (response) {
    for (let i = 0; i < response.Rows.length; i++) {
      if (!(response.Rows[i].Data[2].ScalarValue in deviceSensorArray)) {
        deviceSensorArray[response.Rows[i].Data[2].ScalarValue] = {
          sensorUnit: response.Rows[i].Data[1].ScalarValue,
          measureValue: parseFloat(response.Rows[i].Data[5].ScalarValue),
        };
      } 
    }
    res.status(200).json({ data: deviceSensorArray });
  } else {
    res.status(500).json({ error: "There was an error with your request." });
  }
}

const getAllDevice = async () => {
  const response = await TimestreamModel.getAllDevices();

  if (response) {
    console.log(response);
    return response;

  } else {
    console.log("error");
    return null;
  }
}






export default module.exports = {
  getAllBuoyIds,
  getCurrentBuoyData,
  getBuoyHistory,
  getBuoyThreshold,
  getCachedDeviceData,
  // getCachedHistoricalHighLow,
  // getCachedLogData,
  // getCustomRangeData,
  // getCustomRangeLogData,
  test,
  getHistoricalHighLow,
  getSensors,
  getData,
  getAllDevice,

  
};
