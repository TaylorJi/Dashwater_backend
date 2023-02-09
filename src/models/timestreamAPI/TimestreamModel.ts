/**
 * This module contains the timestream data model, to interact with AWS timestream db
 * 
 */

import {createTSQuery} from '../../helpers/timestreamAPI/functions/awsHelpers';

const getAllDevices = async (queryString: string) => {
  try {  
    const [timestreamQuery, queryParams] = createTSQuery(queryString);
    const data = await new Promise((resolve, reject) => {
      timestreamQuery.query(queryParams, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    if (!data) { return null }

    return data;

  } catch (err) {
    throw err;
  }

}

export default module.exports = {
  getAllDevices,
}
