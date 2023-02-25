import express, {Router} from "express";
export const router: Router = express.Router();

import UserController from "../controllers/user/UserController";


router.route('/createUser').post(UserController.createUser);
router.route('/validateUser').post(UserController.validateUser);