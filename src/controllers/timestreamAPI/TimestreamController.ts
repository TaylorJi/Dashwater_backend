import { Request, Response } from "express";
import TimestreamModel from "../../models/timestreamAPI/TimestreamModel";

import sqlQueries from "../../helpers/timestreamAPI/constants/sqlQueries";

const getAllDeviceIds = async (req: Request, res: Response) => {

  if(!req.body) 
    res.status(400).json({message: "Could not find selected devices."})
  else {
    const response = await TimestreamModel.getAllDevices(sqlQueries.DEVICE_IDS);
    if (response) 
      res.status(200).json({response})
     else 
      res.status(500).json({error: "Server response failed."})
  } 
}

export default module.exports = {
  getAllDeviceIds,
}

