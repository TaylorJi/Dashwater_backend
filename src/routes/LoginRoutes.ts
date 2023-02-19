import express, {Router} from "express";
export const router: Router = express.Router();

import LoginController from "../controllers/login/LoginController";


router.route('/login').post(LoginController.userLogin);