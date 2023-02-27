import express, { Router } from "express";
export const router: Router = express.Router();

import DeviceController from "../controllers/device/DeviceController";


router.route('/createDevice').post(DeviceController.createDevice);