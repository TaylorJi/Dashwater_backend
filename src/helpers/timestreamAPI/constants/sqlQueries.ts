/**
 * This module contains the SQL queries to send to AWS timestream db.
 * To do: queries need to have user inputs (read from db) before being sent. 
 */

import queryInfo from "./queryInfo"

const ALL_COLUMNS = `SELECT * 
                     FROM ${queryInfo.DATABASE_NAME}.${queryInfo.TABLE_NAME}`;

const DEVICE_IDS = `SELECT buoy_id
                    FROM ${queryInfo.DATABASE_NAME}.${queryInfo.TABLE_NAME}
                    GROUP BY buoy_id ORDER BY buoy_id ASC`;
                    
export default module.exports = {
    ALL_COLUMNS,
    DEVICE_IDS
}