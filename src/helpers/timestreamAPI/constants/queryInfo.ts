/**
 * This module exports all information relating to AWS credentials.
 */

const API_VERSION: string = "2021-11-05";
const REGION: string = "us-west-2";
// const DATABASE_NAME: string = "YVR_water_sensor";
// const TABLE_NAME: string = "EMA_C22_main_data_v00";

const DATABASE_NAME: string = "yvr-stage-db";
const TABLE_NAME: string = "calibrated_device_data";
//TODO: Perhaps move the two below to .env but atm this info isnt set yet
const VERSION_STAGE: string = "AWSCURRENT";
const SECRET_NAME: string = "TokenSecret";

export default module.exports = {
  API_VERSION,
  REGION,
  DATABASE_NAME,
  TABLE_NAME,
  VERSION_STAGE,
  SECRET_NAME
};