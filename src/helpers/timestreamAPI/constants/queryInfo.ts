/**
 * This module exports all information relating to query credentials.
 *
 *      This information is sent with each query.
 */

const API_VERSION: string = "2021-11-05";
const REGION: string = "us-west-2";
const DATABASE_NAME: string = "YVR_water_sensor";
const TABLE_NAME: string = "EMA_C22_main_data_v00";

export default module.exports = {
  API_VERSION,
  REGION,
  DATABASE_NAME,
  TABLE_NAME,
};