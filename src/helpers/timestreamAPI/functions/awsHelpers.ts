/**
 * This module contains helper functions for AWS queries.
 */

import { Credentials, TimestreamQuery } from "aws-sdk";
import AWS from "aws-sdk";
import queryInfo from "../constants/queryInfo";
import sqlQueries from "../constants/sqlQueries";

interface QueryParams {
  ClientToken?: string;
  MaxRows?: number;
  NextToken?: string;
  QueryString: string;
}

// This function creates and initializes the query and querystring objects.
// Returns an array to be destructured into the seperate objects.
const createTSQuery = (
  queryString: string,
  clientToken?: string,
  maxRows?: number,
  nextToken?: string
): any => {
  //Configure the region
  AWS.config.update({ region: queryInfo.REGION });
  //Create credentials
  const credentials = new Credentials({
    accessKeyId: `${process.env.AWS_API_ACCESS_KEY}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
  });
  //Create the query object
  const timeStreamQuery = new TimestreamQuery({
    apiVersion: queryInfo.API_VERSION,
  });
  //Configure the query objects using credentials.
  timeStreamQuery.config.update({
    credentials,
    region: queryInfo.REGION,
  });
  //Create the query object.
  const queryParams: QueryParams = {
    ClientToken: clientToken,
    MaxRows: maxRows,
    NextToken: nextToken,
    QueryString: queryString,
  };
  //Pack query and query string objects into array.
  return [timeStreamQuery, queryParams] as const;
};

const buildCurrentQuery = (buoyIdList: string) => {
  const buoyIds = "('" + buoyIdList.split(",").join("', '") + "')";
  return sqlQueries.DEVICE_ID_MEASURE_TIME + buoyIds + sqlQueries.CURRENT_INFO;
};

const buildHistoricalQuery = (
  buoyIdList: string,
  measureName: string,
  start: string,
  end: string
) => {
  return (
    sqlQueries.DEVICE_INFO +
    buoyIdList +
    sqlQueries.MEASURE_NAME +
    measureName +
    sqlQueries.START_TIME +
    start +
    sqlQueries.END_TIME +
    end
  );
};



// async function runAllQueries() {
//     // const queries = [QUERY_ONE, QUERY_TWO];
//     const queries = [DENISE_TEST];

//     let json = [];
//     for (let i = 0; i < queries.length; i++) {
//         console.log(`Running query ${i+1} : ${queries[i]}`);
//         let queryResult = await getAllRows(queries[i], null);
//         json.push(queryResult);
//     }
//     return json;
// }

// async function getAllRows(query, nextToken = undefined) {
//     let response;
//     try {
//         response = await queryClient.query(params = {
//             QueryString: query,
//             NextToken: nextToken,
//         }).promise();
//         // console.log("goodbye", response);
//     } catch (err) {
//         console.error("Error while querying:", err);
//         throw err;
//     }
//     let json = parseQueryResult(response);
//     if (response.NextToken) {
//         let holding = await getAllRows(query, response.NextToken);
//         json = json.concat(holding);
//     }
//     return json;
// }

// function parseQueryResult(response) {
//     const queryStatus = response.QueryStatus;
//     // console.log("Current query status: " + JSON.stringify(queryStatus));

//     const columnInfo = response.ColumnInfo;
//     const rows = response.Rows;

//     // console.log("Metadata: " + JSON.stringify(columnInfo));
//     // console.log("Data: ");

//     let json = [];
//     rows.forEach(function (row) {
//         json.push(JSON.parse(parseRow(columnInfo, row)))
//         // CONSOLE LOG DATA
//         // console.log(parseRow(columnInfo, row) + "\n");
//     });
//     return(json)
// }

// function parseRow(columnInfo, row) {
//     const data = row.Data;
//     const rowOutput = [];

//     var i;
//     for ( i = 0; i < data.length; i++ ) {
//         info = columnInfo[i];
//         datum = data[i];
//         rowOutput.push(parseDatum(info, datum));
//     }

//     return `{${rowOutput.join(", ")}}`
// }

// function parseDatum(info, datum) {
//     if (datum.NullValue != null && datum.NullValue === true) {
//         return `"${info.Name}":null`;
//     }

//     const columnType = info.Type;

//     // If the column is of TimeSeries Type
//     if (columnType.TimeSeriesMeasureValueColumnInfo != null) {
//         return parseTimeSeries(info, datum);
//     }
//     // If the column is of Array Type
//     else if (columnType.ArrayColumnInfo != null) {
//         const arrayValues = datum.ArrayValue;
//         return `"${info.Name}": "${parseArray(info.Type.ArrayColumnInfo, arrayValues)}"`;
//     }
//     // If the column is of Row Type
//     else if (columnType.RowColumnInfo != null) {
//         const rowColumnInfo = info.Type.RowColumnInfo;
//         const rowValues = datum.RowValue;
//         return parseRow(rowColumnInfo, rowValues);
//     }
//     // If the column is of Scalar Type
//     else {
//         return parseScalarType(info, datum);
//     }
// }

// function parseTimeSeries(info, datum) {
//     const timeSeriesOutput = [];
//     datum.TimeSeriesValue.forEach(function (dataPoint) {
//         timeSeriesOutput.push(`{time=${dataPoint.Time}, value=${parseDatum(info.Type.TimeSeriesMeasureValueColumnInfo, dataPoint.Value)}}`)
//     });

//     return `[${timeSeriesOutput.join(", ")}]`
// }

// function parseScalarType(info, datum) {
//     return parseColumnName(info) + `"${datum.ScalarValue}"`;
// }

// function parseColumnName(info) {
//     return info.Name == null ? "" : `"${info.Name}":`;
// }

// function parseArray(arrayColumnInfo, arrayValues) {
//     const arrayOutput = [];
//     arrayValues.forEach(function (datum) {
//         arrayOutput.push(parseDatum(arrayColumnInfo, datum));
//     });
//     return `[${arrayOutput.join(", ")}]`
// }

// module.exports = {runAllQueries, getAllRows};

export default module.exports = {
  createTSQuery,
  buildCurrentQuery,
  buildHistoricalQuery,
};
