/**
 * This module contains the SQL queries to send to AWS timestream db.
 * To do: queries need to have user inputs (read from db) before being sent.
 * 
 * Note:
 *  The idea behind storing all the SQL queries here is to make a transition to sql builders easier.
 *  Recommended to switch to a more readable format (ie: ts-sql-query)
 */

import queryInfo from "./queryInfo";

const DEVICE_IDS = `SELECT buoy_id
                    FROM ${queryInfo.DATABASE_NAME}.${queryInfo.TABLE_NAME}
                    GROUP BY buoy_id 
                    ORDER BY buoy_id ASC`;

const DEVICE_ID_MEASURE_TIME =
  "SELECT * " +
  "FROM (SELECT buoy_id, measure_name, " +
  "max(time) AS time " +
  "FROM " +
  queryInfo.DATABASE_NAME +
  "." +
  queryInfo.TABLE_NAME +
  " " +
  "WHERE buoy_id IN ";

const CURRENT_INFO =
  " AND time >= ago(365d) " +
  "GROUP BY buoy_id, measure_name) AS current_data " +
  "INNER JOIN " +
  queryInfo.DATABASE_NAME +
  "." +
  queryInfo.TABLE_NAME +
  " " +
  "ON " +
  queryInfo.DATABASE_NAME +
  "." +
  queryInfo.TABLE_NAME +
  ".buoy_id = current_data.buoy_id AND " +
  queryInfo.DATABASE_NAME +
  "." +
  queryInfo.TABLE_NAME +
  ".measure_name = current_data.measure_name AND " +
  queryInfo.DATABASE_NAME +
  "." +
  queryInfo.TABLE_NAME +
  ".time = current_data.time " +
  "ORDER BY " +
  queryInfo.DATABASE_NAME +
  "." +
  queryInfo.TABLE_NAME +
  ".buoy_id ASC, " +
  queryInfo.DATABASE_NAME +
  "." +
  queryInfo.TABLE_NAME +
  ".measure_name ASC";

const DEVICE_INFO =
  "SELECT * " +
  "FROM " +
  queryInfo.DATABASE_NAME +
  "." +
  queryInfo.TABLE_NAME +
  " " +
  "WHERE device_name = ";

const MEASURE_NAME = " AND sensor_name = ";

const START_TIME = " AND time BETWEEN from_iso8601_timestamp('";

const END_TIME = "') AND from_iso8601_timestamp('";

const ORDER_ASC = "') " + "ORDER BY time ASC";

const TIMESTREAM_TABLES = `SHOW TABLES IN ${queryInfo.DATABASE_NAME}`;

const TEST = `SELECT sensor_name, measure_value::double, time
FROM "${queryInfo.DATABASE_NAME}"."${queryInfo.TABLE_NAME}"
WHERE time BETWEEN '2023-11-16 05:00:00.000000000' AND '2023-11-16 19:00:00.000000000'
order by time`


const DEVICES = `SELECT device_name
FROM "${queryInfo.DATABASE_NAME}"."${queryInfo.TABLE_NAME}"
GROUP BY device_name
ORDER BY device_name ASC`;

const SENSORS = `SELECT sensor_name
FROM "${queryInfo.DATABASE_NAME}"."${queryInfo.TABLE_NAME}"'
GROUP BY sensor_name
ORDER BY sensor_name ASC`


export default module.exports = {
  DEVICE_IDS,
  DEVICE_ID_MEASURE_TIME,
  CURRENT_INFO,
  DEVICE_INFO,
  MEASURE_NAME,
  START_TIME,
  ORDER_ASC,
  END_TIME,
  TIMESTREAM_TABLES,
  TEST,
  DEVICES,
  SENSORS
};