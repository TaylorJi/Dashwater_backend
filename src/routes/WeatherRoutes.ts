import express, { Router } from 'express';
export const router: Router = express.Router();

import WeatherController from '../controllers/weather/WeatherController';

router.route('/getWeather').get(WeatherController.getWeather);