import express, {Router} from "express";
export const router: Router = express.Router();

import UserController from "../controllers/user/UserController";


router.route('/createUser').post(UserController.createUser);
router.route('/validateUser').post(UserController.validateUser);
router.route('/getUser').get(UserController.getUser);
router.route('/getSingleUser/:id').get(UserController.getSingleUser);
router.route('/deleteUser/:id').delete(UserController.deleteUser);
router.route('/updateUser/:id').put(UserController.updateUser);
