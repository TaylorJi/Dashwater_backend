/**
 * This module contains the timestream data model, to interact with AWS timestream db
 * 
 */

import AWSHelpers from '../../helpers/timestreamAPI/functions/awsHelpers';

const getAllDevices = async (queryString: string) => {
  try {  
    const [timestreamQuery, queryParams] = AWSHelpers.createTSQuery(queryString);
    const data = await timestreamQuery.query(queryParams).promise();
    if (!data)
      return null 
    return data;
  } catch (err) {
    return err;
  }
}
export default module.exports = {
  getAllDevices,
}
