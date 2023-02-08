import { Request, Response } from "express";
import TimestreamModel from "../../models/timestreamAPI/TimestreamModel";
// const buoyIdList = [1,2,3,4,5,6,7,8];
const DATABASE_NAME: string = "YVR_water_sensor";
const TABLE_NAME: string = "EMA_C22_main_data_v00";


export class TimestreamController {
    
    static async queryData(req: Request, res: Response): Promise<void> {
      let queryString = String(req.query.query);
    // To be used if our database changes but I figure this is ok for now
        //   const databaseName = String(req.query.database);

    // Test query, this gives you the column names for the table.
        queryString = "SELECT *" +
        "FROM " +
        DATABASE_NAME +
        "." +
        TABLE_NAME;
      try {
        const data = await TimestreamModel.queryData(queryString);
        res.status(200).json(data);
      } catch (err: any) {
        res.status(500).json({ err });
      }
    }

    
  }