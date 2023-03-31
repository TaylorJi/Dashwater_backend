import express, { Router } from "express";
import TimestreamController from "../controllers/timestreamAPI/TimestreamController";
export const router: Router = express.Router();
router.route("/allDev").get(TimestreamController.getAllBuoyIds);
router.route("/current").get(TimestreamController.getCurrentBuoyData);
router.route("/historical").get(TimestreamController.getBuoyHistory);
router.route("/threshold").get(TimestreamController.getBuoyThreshold);