/**
 * This module contains the timestream data model, to interact with AWS timestream db
 */

import sqlQueries from "../../helpers/timestreamAPI/constants/sqlQueries";
import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";

const AWS = require('aws-sdk');

const getAllBuoyIds = async (queryString: string) => {

  try {
    const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(queryString);
    console.log(timestreamQuery);

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

const test = async () => {
  console.log('test');
  console.log('AWS_API_ACCESS_KEY', `${process.env.AWS_API_ACCESS_KEY}`)
  console.log('SECRET_ACCESS_KEY', `${process.env.SECRET_ACCESS_KEY}`)
  AWS.config.update({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: 'us-west-2',
  });

  const timestreamClient = new AWS.TimestreamQuery();
  const query = sqlQueries.TEST;
  console.log(query);
  const params = {
    QueryString: query
  };

  


  timestreamClient.query(params, (err:AWS.AWSError, data:AWS.TimestreamQuery.QueryResponse) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      data.Rows.forEach((row) => {
        const rowData = row.Data.map((datum, index) => {
          const key = data.ColumnInfo[index].Name as string;

          return {
            [key]: datum.ScalarValue,
          };
        });
        console.log('Row Data:', rowData);
      });
    }
  })

}

export default module.exports = {
  getAllBuoyIds,
  getBuoyData,
  getHistoricalData,
  getThresholdData,
  getHistoricalLow,
  getHistoricalHigh,
  test
};
