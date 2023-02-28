import express, { Router } from "express";
import TrackedDeviceController from "../controllers/device/TrackedDeviceController";

export const router: Router = express.Router();

router.route('/init').get(TrackedDeviceController.initialize);