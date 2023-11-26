import express, { Router } from "express";
import TimestreamController from "../controllers/timestreamAPI/TimestreamController";

export const router: Router = express.Router();

// router.route("/getAllBuoyIds").post(TimestreamController.getAllBuoyIds);
router.route("/getAllBuoyIds").get(TimestreamController.getAllBuoyIds);
router.route("/test").get(TimestreamController.test);

router.route("/getCurrentBuoyData").get(TimestreamController.getCurrentBuoyData);
router.route("/getBuoyHistory").get(TimestreamController.getBuoyHistory);
router.route("/getBuoyThreshold").get(TimestreamController.getBuoyThreshold);


// router for getting historical high and low
router.route("/getHistoricalHighLow").post(TimestreamController.getHistoricalHighLow);
router.route("/getSensors").post(TimestreamController.getSensors);
router.route("/getData").post(TimestreamController.getData);
router.route("/getAllDevice").get(TimestreamController.getAllDevice);

// cached data routes, we no longer use them
router.route("/getCachedData").post(TimestreamController.getCachedDeviceData);
// router.route("/getCachedHistorical").get(TimestreamController.getCachedHistoricalHighLow);
// router.route("/getCachedLogData").post(TimestreamController.getCachedLogData);
// router.route("/getCustomRangeData").post(TimestreamController.getCustomRangeData);
// router.route("/getCustomRangeLogData").post(TimestreamController.getCustomRangeLogData);