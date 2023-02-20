import express, {Router} from "express";
export const router: Router = express.Router();

import RegisterController from "../controllers/register/RegisterController";


router.route('/register').post(RegisterController.userRegister);