import express, {Router} from "express";
export const router: Router = express.Router();

import UserController from "../controllers/user/UserController";


router.route('/createUser').post(UserController.createUser);
router.route('/validateUser').post(UserController.validateUser);
router.route('/validateUser').post(UserController.validateUser);
// router.route('/getUser').get(UserController.getUser);
router.route('/getUser').post(UserController.getUser);
router.route('/getSingleUser').post(UserController.getSingleUser);
router.route('/deleteUser').post(UserController.deleteUser);
router.route('/updateUser').post(UserController.updateUser);