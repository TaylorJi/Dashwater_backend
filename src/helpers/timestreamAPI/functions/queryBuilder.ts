/**
 * This module contains helper functions for AWS queries.
 */

import { Credentials, TimestreamQuery } from "aws-sdk";
import AWS from "aws-sdk";
import queryInfo from "../constants/queryInfo";
import sqlQueries from "../constants/sqlQueries";
import { QueryParams } from "./query";



const setUpQuery = (queryString: string) => {
  AWS.config.update({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`, 
    region: queryInfo.REGION 
  });

    // const timestreamClient = new AWS.TimestreamQuery();
  // const query = sqlQueries.TEST;
  // const params = {
  //   QueryString: query
  // };
  const timestreamQuery = new AWS.TimestreamQuery();
  const params = {
    QueryString: queryString
  };
  return [timestreamQuery, params] as const; 

}



// This function creates and initializes the query and querystring objects.
// Returns an array to be destructured into the seperate objects.
const createTSQuery = (
  queryString: string,
  clientToken?: string,
  maxRows?: number,
  nextToken?: string
): any => {
  //Configure the region
  AWS.config.update({ region: queryInfo.REGION });
  //Create credentials
  const credentials = new Credentials({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
  });
  require('dotenv').config();
// console.log(process.env.AWS_API_ACCESS_KEY);
//   console.log("Access Key:", `${process.env.AWS_API_ACCESS_KEY}`);
//   console.log("Secret Key:", process.env.SECRET_ACCESS_KEY);
  //Create the query object
  const timeStreamQuery = new TimestreamQuery({
    apiVersion: queryInfo.API_VERSION,
  });
  //Configure the query objects using credentials.
  timeStreamQuery.config.update({
    credentials,
    region: queryInfo.REGION,
  });
  //Create the query object.
  const queryParams: QueryParams = {
    ClientToken: clientToken,
    MaxRows: maxRows,
    NextToken: nextToken,
    QueryString: queryString,
  };
  //Pack query and query string objects into array.
  return [timeStreamQuery, queryParams] as const;
};

// To be re-used to parse an array of ids delimited by commas
const parseDeviceList = (buoyIdList: string) => {
  return "('" + buoyIdList.split(",").join("', '") + "')";
};

// Build current resource query
const buildCurrentQuery = (buoyIdList: string) => {
  const buoyIds = parseDeviceList(buoyIdList);
  return sqlQueries.DEVICE_ID_MEASURE_TIME + buoyIds + sqlQueries.CURRENT_INFO;
};

// Build query for each device's historical data
const buildHistoricalQuery = (
  buoyIdList: string,
  measureName: string,
  start: string,
  end: string
) => {
  return (
    sqlQueries.DEVICE_INFO +
    buoyIdList +
    sqlQueries.MEASURE_NAME +
    "'" +
    measureName +
    "'" +
    sqlQueries.START_TIME +
    start +
    sqlQueries.END_TIME +
    end +
    sqlQueries.ORDER_ASC
  );
};

// Build minimum query for circle graph data
// const buildMinQuery = (
//   buoyId: string,
//   measureName: string
// ) => {
//   return (
//     `SELECT min(measure_value::double) AS minimum FROM YVR_water_sensor.EMA_C22_main_data_v00 WHERE buoy_id IN (${buoyId}) AND measure_name = '${measureName}'`
//   );
// };

// Build minimum query for circle graph data
const buildMinQuery = (
  deviceName: string,
  sensorName: string
) => {
  return (
    `SELECT min(measure_value::double) AS maximum FROM "yvr-stage-db"."calibrated_device_data" WHERE sensor_name = '${sensorName}' and device_name = '${deviceName}'`
  );
};

// Build maximum query for circle graph data
const buildMaxQuery = (
  deviceName : string,

  sensorName: string
) => {
  return (
    `SELECT max(measure_value::double) AS minimum FROM "yvr-stage-db"."calibrated_device_data" WHERE sensor_name = '${sensorName}' and device_name = '${deviceName}'`  
    );
};




const allSensor = (
  deviceName:string
) => {
  return (
    `SELECT sensor_name FROM "yvr-stage-db"."calibrated_device_data" WHERE device_name = '${deviceName}' group by sensor_name order by sensor_name asc` 
  );

}


// Build query for each device's historical data
const buildThresholdQuery = (
  buoyIdList: string,
  measureName: string,
  start: string,
  end: string,
  measureValueType: any,
  thresholdAmount: any,
) => {
  return (
    sqlQueries.DEVICE_INFO +
    buoyIdList +
    sqlQueries.MEASURE_NAME +
    "'" +
    measureName +
    "'" +
    sqlQueries.START_TIME +
    start +
    sqlQueries.END_TIME +
    end +
    "') AND " +
    measureValueType +
    thresholdAmount +
    " " + "ORDER BY time ASC"
  );
};




export default module.exports = {
  createTSQuery,
  buildCurrentQuery,
  buildHistoricalQuery,
  parseDeviceList,
  buildThresholdQuery,
  buildMinQuery,
  buildMaxQuery,
  setUpQuery,
  allSensor
};