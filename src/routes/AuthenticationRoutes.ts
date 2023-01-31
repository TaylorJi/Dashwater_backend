import express, { Router } from 'express';
export const router: Router = express.Router();

import AuthController from '../controllers/authentication/AuthenticationController';

router.route('/testAuth').get(AuthController.authControllerTest);