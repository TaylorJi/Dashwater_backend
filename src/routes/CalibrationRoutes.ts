import express, { Router } from 'express';
export const router: Router = express.Router();

import CalibrationController from '../controllers/calibration/CalibrationController';

router.route('/getSensorCalibrationPoints').get(CalibrationController.getSensorCalibrationPoints);
