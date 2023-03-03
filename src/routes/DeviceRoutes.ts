import express, { Router } from "express";
import TrackedDeviceController from "../controllers/device/TrackedDeviceController";

export const router: Router = express.Router();

router.route('/getAllTrackedDevices').get(TrackedDeviceController.getAllDevices);
router.route('/createTrackedDevice').post(TrackedDeviceController.createTrackedDevice);