import express, { Router } from "express";
export const router: Router = express.Router();

import DeviceController from "../controllers/device/DeviceController";


router.route('/createDevice').post(DeviceController.createDevice);
router.route('/updateDevice').put(DeviceController.updateDevice);
router.route('/deleteDevice').delete(DeviceController.deleteDevice);
router.route('/getAllDevices').get(DeviceController.getAllDevices);
router.route('/getSingleDevice').get(DeviceController.getSingleDevice);
router.route('/getDevicesWithinRadius').get(DeviceController.getDevicesWithinRadius);
router.route('/getAllDevicesSettings').get(DeviceController.getAllDevicesSettings);
router.route('/updateDeviceSettings').post(DeviceController.updateDeviceSettings);