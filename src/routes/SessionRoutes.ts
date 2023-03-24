import express, { Router } from "express";
import SessionController from "../controllers/session/SessionController";

export const router: Router = express.Router();

router.route('/createSession').post(SessionController.createSession);
router.route('/validateSession').get(SessionController.validateSession);
router.route('/deleteSession').delete(SessionController.deleteSession);