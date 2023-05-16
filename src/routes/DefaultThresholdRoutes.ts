import express, { Router } from "express";
export const router: Router = express.Router();

import DefaultThresholdController from "../controllers/defaultThreshold/DefaultThresholdController";


router.route('/createDefaultThreshold').post(DefaultThresholdController.createDefaultThreshold);
router.route('/updateDefaultThreshold').put(DefaultThresholdController.updateDefaultThreshold);
router.route('/deleteDefaultThreshold').delete(DefaultThresholdController.deleteDefaultThreshold);
router.route('/getAllDefaultThresholds').get(DefaultThresholdController.getAllDefaultThresholds);
router.route('/getSingleDefaultThreshold').get(DefaultThresholdController.getSingleDefaultThreshold);