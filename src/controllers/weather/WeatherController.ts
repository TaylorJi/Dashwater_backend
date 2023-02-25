import { Request, Response } from "express";
import WeatherModel from "../../models/weather/WeatherModel";

const getWeather = async (_req: Request, res: Response) => {

    const response = await WeatherModel.getWeather();
    if (response) {
        res.status(200).json({ message: 'Sucessfully fetched weather data.', data: response });
    } else {
        res.status(500).json({ message: 'There was a problem fetching the weather data.' });
    }
};

const getTide = async (_req: Request, res: Response) => {

    const response = await WeatherModel.getTide();
    if (response) {
        res.status(200).json({ message: 'Sucessfully fetched tide data.', data: response });
    } else {
        res.status(500).json({ message: 'There was a problem fetching the tide data.' });
    }
};

export default module.exports = {
    getWeather,
    getTide
};