/**
 * This module contains the timestream data model, to interact with AWS timestream db
 */

import AWSHelpers from "../../helpers/timestreamAPI/functions/awsHelpers";

const getAllDeviceIds = (queryString: string) => {
  try {
    const [timestreamQuery, queryParams] = AWSHelpers.createTSQuery(queryString);
    const data = timestreamQuery.query(queryParams).promise();
    if (data) return data;
    return null;
  } catch (err) {
    return err;
  }
};

const getDeviceInfo = (buoyIdList: string) => {
  try {
    const query =  AWSHelpers.buildCurrentQuery(buoyIdList);
    const [timestreamQuery, queryParams] = AWSHelpers.createTSQuery(query);
    const data = timestreamQuery.query(queryParams).promise();
    if (data) return data;
    return null;
  } catch (err) {
    return err;
  }
};



export default module.exports = {
  getAllDeviceIds,
  getDeviceInfo,
};