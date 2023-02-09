/**
 * This module contains helper functions for AWS queries. 
 */

import { Credentials, TimestreamQuery } from 'aws-sdk';
import AWS from 'aws-sdk'
import queryInfo from '../constants/queryInfo';

// This function creates and initializes the query and querystring objects.
// Returns an array to be destructured into the seperate objects.
export function createTSQuery(queryString: string): any {
    //Configure the region
    AWS.config.update({region: queryInfo.REGION})
    //Create credentials
    const credentials =  new Credentials({
        accessKeyId: queryInfo.ACCESS_KEY_ID, 
        secretAccessKey: queryInfo.SECRET_ACCESS_KEY
    });
    //Create the query object
    const timeStreamQuery = new TimestreamQuery({
        apiVersion: queryInfo.API_VERSION,
    });
    //Configure the query objects using credentials.
    timeStreamQuery.config.update({
        credentials,
        region: queryInfo.REGION
    })
    //Create the query object.
    const queryParams = {
        QueryString: queryString,
    }
    //Pack query and query string objects into array.
    return [timeStreamQuery, queryParams] as const;

}






