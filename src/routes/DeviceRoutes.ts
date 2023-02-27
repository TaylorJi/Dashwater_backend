import express, { Router } from "express";
export const router: Router = express.Router();

import DeviceController from "../controllers/device/DeviceController";


router.route('/createDevice').post(DeviceController.createDevice);
router.route('/updateDevice').put(DeviceController.updateDevice);
router.route('/deleteDevice').delete(DeviceController.deleteDevice);