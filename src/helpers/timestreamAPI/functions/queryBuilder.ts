/**
 * This module contains helper functions for AWS queries.
 */

import { TimestreamQueryClient, TimestreamQueryClientConfig } from "@aws-sdk/client-timestream-query";
import { AwsCredentialIdentity } from "@aws-sdk/types";

import queryInfo from "../constants/queryInfo";
import sqlQueries from "../constants/sqlQueries";
import { QueryParams } from "./query";

const createStaticCredentialsProvider = (): AwsCredentialIdentity => {
  return {
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
  };
};

const createTSQuery = (
  queryString: string,
  clientToken?: string,
  maxRows?: number,
  nextToken?: string
): any => {
  const credentials = createStaticCredentialsProvider();

  // Create and configure the TimestreamQueryClient
  const tsQueryConfig: TimestreamQueryClientConfig = {
    region: queryInfo.REGION,
    credentials,
  };

  // Create the TimestreamQueryClient with the configured options
  const timeStreamQuery = new TimestreamQueryClient(tsQueryConfig);

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
  buildThresholdQuery
};