import express, {Router} from "express";
export const router: Router = express.Router();

import UserController from "../controllers/user/UserController";


router.route('/signup').post(UserController.createNewUser);