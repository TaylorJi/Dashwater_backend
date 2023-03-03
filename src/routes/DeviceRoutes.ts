import express, { Router } from "express";
import TrackedDeviceController from "../controllers/device/TrackedDeviceController";

export const router: Router = express.Router();

router.route('/getAllTrackedDevices').get(TrackedDeviceController.getAllTrackedDevices);
router.route('/createTrackedDevice').post(TrackedDeviceController.createTrackedDevice);
router.route('/deleteTrackedDevice').delete(TrackedDeviceController.deleteTrackedDevice);
router.route('/deleteAllTrackedDevices').delete(TrackedDeviceController.deleteAllTrackedDevices);