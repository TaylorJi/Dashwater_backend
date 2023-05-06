import express, {Router} from "express";
export const router: Router = express.Router();

import UserController from "../controllers/user/UserController";


router.route('/createUser').post(UserController.createUser);
router.route('/validateUser').post(UserController.validateUser);

//20230505 EJ
router.route('/getUser').get(UserController.getUser);