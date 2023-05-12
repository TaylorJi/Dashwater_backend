import express, { Router } from "express";
import CircleGraphController from "../controllers/circle_graph/CircleGraphController";
export const router: Router = express.Router();

router.route('/getGraphData').get(CircleGraphController.getGraphData);
router.route('/getCachedDeviceData').get(CircleGraphController.getCachedDeviceData);