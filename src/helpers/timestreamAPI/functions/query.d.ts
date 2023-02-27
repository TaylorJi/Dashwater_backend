/**
 * This module contains query types to be used for AWS teim
 */

export type QueryResult = {
    QueryStatus: any;
    ColumnInfo: ColumnInfo[];
    Rows: any[];
  }
  
export type ColumnInfo = {
    Name: string;
    Type: any;
}

export type QueryParams = {
  ClientToken?: string;
  MaxRows?: number;
  NextToken?: string;
  QueryString: string;
}
