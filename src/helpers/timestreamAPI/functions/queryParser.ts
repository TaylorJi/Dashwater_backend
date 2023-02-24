interface QueryResult {
  QueryStatus: any;
  ColumnInfo: any[];
  Rows: any[];
}

interface ColumnInfo {
  Name: string;
  Type: any;
}

const parseRow = (columnInfo: ColumnInfo[], row: any): string => {
  const data = row.Data;
  const rowOutput: string[] = [];

  for (let i = 0; i < data.length; i++) {
    const info = columnInfo[i];
    const datum = data[i];
    rowOutput.push(parseDatum(info, datum));
  }

  return `{${rowOutput.join(", ")}}`;
};

const parseDatum = (info: ColumnInfo, datum: any): string => {
  if (datum.NullValue != null && datum.NullValue === true) {
    return `"${info.Name}":null`;
  }

  const columnType = info.Type;

  if (columnType.TimeSeriesMeasureValueColumnInfo != null) {
    return parseTimeSeries(info, datum);
  } else if (columnType.ArrayColumnInfo != null) {
    const arrayValues = datum.ArrayValue;
    return `"${info.Name}": "${parseArray(
      info.Type.ArrayColumnInfo,
      arrayValues
    )}"`;
  } else if (columnType.RowColumnInfo != null) {
    const rowColumnInfo = info.Type.RowColumnInfo;
    const rowValues = datum.RowValue;
    return parseRow(rowColumnInfo, rowValues);
  } else {
    return parseScalarType(info, datum);
  }
};

const parseTimeSeries = (info: ColumnInfo, datum: any): string => {
  const timeSeriesOutput: string[] = [];
  datum.TimeSeriesValue.forEach(function (dataPoint: any) {
    timeSeriesOutput.push(
      `{time=${dataPoint.Time}, value=${parseDatum(
        info.Type.TimeSeriesMeasureValueColumnInfo,
        dataPoint.Value
      )}}`
    );
  });

  return `[${timeSeriesOutput.join(", ")}]`;
};

const parseScalarType = (info: ColumnInfo, datum: any): string => {
  return parseColumnName(info) + `"${datum.ScalarValue}"`;
};

const parseColumnName = (info: ColumnInfo): string => {
  return info.Name == null ? "" : `"${info.Name}":`;
};

const parseArray = (arrayColumnInfo: any, arrayValues: any[]): string => {
  const arrayOutput: string[] = [];
  arrayValues.forEach(function (datum) {
    arrayOutput.push(parseDatum(arrayColumnInfo, datum));
  });
  return `[${arrayOutput.join(", ")}]`;
};

const parseQueryResult = (response: QueryResult): any[] => {
  // const queryStatus = response.QueryStatus;
  const columnInfo = response.ColumnInfo;
  const rows = response.Rows;

  let json: any[] = [];
  rows.forEach((row) => {
    json.push(JSON.parse(parseRow(columnInfo, row)));
  });
  return json;
};

export default module.exports = {
  parseQueryResult,
};
