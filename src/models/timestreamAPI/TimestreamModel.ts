/**
 * This module contains the timestream data model, to interact with AWS timestream db
 */

import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";
const getAllDeviceIds = (queryString: string) => {
  try {
    const [timestreamQuery, queryParams] =
      queryBuilder.createTSQuery(queryString);
    const data = timestreamQuery.query(queryParams).promise();
    if (data) return data;
    return null;
  } catch (err) {
    return err;
  }
};

const getDeviceInfo = (buoyIdList: string) => {
  try {
    const query = queryBuilder.buildCurrentQuery(buoyIdList);
    const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(query);
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