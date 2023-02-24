/**
 * This module contains helper functions for AWS queries.
 */

import { Credentials, TimestreamQuery } from "aws-sdk";
import AWS from "aws-sdk";
import queryInfo from "../constants/queryInfo";
import sqlQueries from "../constants/sqlQueries";

interface QueryParams {
  ClientToken?: string;
  MaxRows?: number;
  NextToken?: string;
  QueryString: string;
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

const buildCurrentQuery = (buoyIdList: string) => {
  const buoyIds = "('" + buoyIdList.split(",").join("', '") + "')";
  return sqlQueries.DEVICE_ID_MEASURE_TIME + buoyIds + sqlQueries.CURRENT_INFO;
};

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
    measureName +
    sqlQueries.START_TIME +
    start +
    sqlQueries.END_TIME +
    end
  );
};


export default module.exports = {
  createTSQuery,
  buildCurrentQuery,
  buildHistoricalQuery,
};
