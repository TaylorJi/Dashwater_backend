import express, { Router } from "express";
export const router: Router = express.Router();

import UserThresholdController from "../controllers/userThreshold/UserThresholdController";


router.route('/createUserThreshold').post(UserThresholdController.createUserThreshold);
router.route('/updateUserThreshold').put(UserThresholdController.updateUserThreshold);
router.route('/deleteUserThreshold').delete(UserThresholdController.deleteUserThreshold);
router.route('/getUserThresholdList').get(UserThresholdController.getUserThresholdList);
router.route('/getSingleMetricUserThreshold').get(UserThresholdController.getSingleMetricUserThreshold);