import express, { Router } from "express";
export const router: Router = express.Router();

import UserThresholdController from "../controllers/userThreshold/UserThresholdController";


router.route('/createUserThreshold').post(UserThresholdController.createUserThreshold);