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
const getHistoricalData = async (buoyIdList: string, measureName: string, end: string, startDate: string, endDate: string) => {
  AWS.config.update({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: 'us-west-2',
  });

  const timestreamClient = new AWS.TimestreamQuery();
  let query;
  if (end === 'Custom') {
    query = queryBuilder.getCustomRangeData(buoyIdList, measureName, startDate, endDate);
  } else {
    query = queryBuilder.buildHistoricalQuery(buoyIdList, measureName, end); // start, end
  }
  // console.log("~~~~~~~~~~~~~~ query: " + query);
  const params = {
    QueryString: query
  };
  try {
    const data = await timestreamClient.query(params).promise();
    // console.log("!!!!!!!!!!!!!!!!! data: " + JSON.stringify(data));
    return data;
  } catch (err) {
    return null;
  };
};


// This function gets info for each buoy id in the list 
//  based on the threshold which is a 
const getThresholdData = async (buoyIdList: string, measureName: string, start: string,
  end: string, measureValueType: string, thresholdAmount: number) => {
  try {
    const query = queryBuilder.buildThresholdQuery(buoyIdList, measureName, start, end, measureValueType, thresholdAmount); 

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

const getHistoricalLow = async (deviceName: string, sensorName: string, time: string, startDate: string, endDate: string) => {
  try {
    let query;
    if (time === 'Custom') {
      query = queryBuilder.buildCustomMinQuery(deviceName, sensorName, startDate, endDate);
    } else {
      query = queryBuilder.buildMinQuery(deviceName, sensorName, time);
    }

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

const getHistoricalHigh = async (deviceName: string, measureName: string, time: string, startDate: string, endDate: string) => {
  AWS.config.update({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: 'us-west-2',
  });

  const timestreamClient = new AWS.TimestreamQuery();
  let query;
  if (time === 'Custom') {
    query = queryBuilder.buildCustomMaxQuery(deviceName, measureName, startDate, endDate);
  } else {
    query = queryBuilder.buildMaxQuery(deviceName, measureName, time);
  }
  console.log("made qury ---------------------------")
  console.log(query)
  const params = {
    QueryString: query
  };
  try {
    const data = await timestreamClient.query(params).promise();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }




  // try {
  //   const query = queryBuilder.buildMaxQuery(measureName);

  //   const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(query);

  //   const data = await timestreamQuery.query(queryParams).promise();

  //   if (data) {
  //     return data;
  //   }

  //   return null;
  // } catch (_err) {
  //   return null;
  // }
}

const test = async () => {

  AWS.config.update({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: 'us-west-2',
  });

  const timestreamClient = new AWS.TimestreamQuery();
  const query = sqlQueries.TEST;
  const params = {
    QueryString: query
  };
  try {
    const data = await timestreamClient.query(params).promise();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }


}

// const getHisttoricalHighLow = async() => {

// }


const getAllDevices = async () => {
  AWS.config.update({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: 'us-west-2',
  });

  const timestreamClient = new AWS.TimestreamQuery();
  const query = sqlQueries.DEVICES;
  const params = {
    QueryString: query
  };
  try {
    const data = await timestreamClient.query(params).promise();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  };
}

const getSensors = async (deviceName: string) => {
  AWS.config.update({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: 'us-west-2',
  });

  const timestreamClient = new AWS.TimestreamQuery();
  const query = queryBuilder.allSensor(deviceName)
  console.log(query)
  const params = {
    QueryString: query
  };
  try {
    const data = await timestreamClient.query(params).promise();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  };
}


const getData = async (deviceName: string, time: string, startDate: string, endDate: string) => {
  AWS.config.update({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
    region: 'us-west-2',
  });

  const timestreamClient = new AWS.TimestreamQuery();
  let query;
  if (time === 'Custom') {
    query = queryBuilder.getCustomData(deviceName, startDate, endDate);
  } else {
    query = queryBuilder.getData(deviceName, time);
  }
  console.log(query)
  const params = {
    QueryString: query
  };
  try {
    const data = await timestreamClient.query(params).promise();
    return data;
  } catch (err) {
    console.log(err);
    return null;


  }
}



export default module.exports = {
  getAllBuoyIds,
  getBuoyData,
  getHistoricalData,
  getThresholdData,
  getHistoricalLow,
  getHistoricalHigh,
  test,
  getAllDevices,
  getSensors,
  getData,
};
