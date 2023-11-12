/**
 * This module contains the timestream data model, to interact with AWS timestream db
 */

import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";

const getAllBuoyIds = async (queryString: string) => {

  try {
    const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(queryString);

    const data = await timestreamQuery.query(queryParams).promise();

    if (data) {
      return data
    };

    return null;

  } catch (_err) {
    return null;
  }
};

// This function gets sensor data for each buoy id
const getBuoyData = async (buoyIdList: string) => {

  try {
    const query = queryBuilder.buildCurrentQuery(buoyIdList);

    const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(query);

    const data = await timestreamQuery.query(queryParams).promise();

    if (data) {
      return data;
    };

    return null;

  } catch (_err) {
    return null;
  }
};

// This function gets historical data of a specified measure name 
// for each buoyId in list based on start and end time.
const getHistoricalData = async (buoyIdList: string, measureName: string,
  start: string, end: string) => {

  try {
    const query = queryBuilder.buildHistoricalQuery(buoyIdList, measureName, start, end);

    const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(query);

    const data = await timestreamQuery.query(queryParams).promise();

    if (data) {
      return data;
    }

    return null;

  } catch (_err) {
    return null;
  }
};


// This function gets info for each buoy id in the list 
//  based on the threshold which is a 
const getThresholdData = async (buoyIdList: string, measureName: string, start: string,
  end: string, measureValueType: string, thresholdAmount: number) => {

  try {
    const query = queryBuilder.buildThresholdQuery(buoyIdList, measureName, start, end,
      measureValueType, thresholdAmount);

    const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(query);

    const data = await timestreamQuery.query(queryParams).promise();

    if (data) {
      return data;
    }

    return null;

  } catch (_err) {
    return null;
  }
};

const getHistoricalLow = async (buoyId: string, measureName: string) => {
  try {
    const query = queryBuilder.buildMinQuery(buoyId, measureName);

    const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(query);

    const data = await timestreamQuery.query(queryParams).promise();

    if (data) {
      return data;
    }

    return null;
  } catch (_err) {
    return null;
  }
}

const getHistoricalHigh = async (buoyId: string, measureName: string) => {
  try {
    const query = queryBuilder.buildMaxQuery(buoyId, measureName);

    const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(query);

    const data = await timestreamQuery.query(queryParams).promise();

    if (data) {
      return data;
    }

    return null;
  } catch (_err) {
    return null;
  }
}

export default module.exports = {
  getAllBuoyIds,
  getBuoyData,
  getHistoricalData,
  getThresholdData,
  getHistoricalLow,
  getHistoricalHigh
};
