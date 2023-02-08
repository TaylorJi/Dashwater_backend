import express, { Router } from 'express';
import { TimestreamController } from '../controllers/timestreamAPI/TimestreamController';
export const router: Router = express.Router();



router.route('/query').get(TimestreamController.queryData);


