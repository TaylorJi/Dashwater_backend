
import {Credentials, TimestreamQuery} from 'aws-sdk';
import AWS from 'aws-sdk';

const API_VERSION: string = "2021-11-05";
const REGION: string = "us-west-2";


const ACCESS_KEY_ID = process.env.API_ACCESS_KEY || '';
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || '';



AWS.config.update({region: "us-west-2"});

const credentials = new Credentials({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
});

export default class TimestreamModel {
    static async queryData(queryString: string): Promise<any> {
      const timestreamQuery = new TimestreamQuery({
        apiVersion: API_VERSION,
      });

      timestreamQuery.config.update({
        credentials,
        region: REGION
      })

      const queryParams = {
        QueryString: queryString,
        // ClientRequestToken: new Date().toISOString(),
        // DatabaseName: databaseName,
      };
    
      return new Promise((resolve, reject) => {
        timestreamQuery.query(queryParams, (err: any, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
  }