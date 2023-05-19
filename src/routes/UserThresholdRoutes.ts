import express, { Router } from "express";
export const router: Router = express.Router();

import UserThresholdController from "../controllers/userThreshold/UserThresholdController";


router.route('/createUserThreshold').post(UserThresholdController.createUserThreshold); // not in use
router.route('/updateUserThreshold').put(UserThresholdController.updateUserThreshold);
router.route('/getUserThresholdList').get(UserThresholdController.getUserThresholdList); // not in use
router.route('/getUserThresholdsByDevice/:userId/:deviceId').get(UserThresholdController.getUserThresholdsByDevice);