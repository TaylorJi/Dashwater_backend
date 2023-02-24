import axios from "axios";
import AppCache from "../cache/AppCache";
import { timeHelper } from "./weatherHelpers";

const getWeather = async () => {

    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=steveston&aqi=yes&days=3`);
        if (response.status === 200) {

            const data = response.data;

            const forecastData: weatherForecastType[] =
                data['forecast']['forecastday'].map((item: any) => {

                    const date = new Date(item['date'] + 'T00:00:00');

                    const newForecastItem: weatherForecastType = {
                        weekday: date.toLocaleString('en-us', { weekday: 'long' }),
                        iconURL: item['day']['condition']['icon'],
                        high: item['day']['maxtemp_c'],
                        low: item['day']['mintemp_c']
                    };

                    return newForecastItem;
                });

            const currWeatherData: weatherDataType = {
                currWeather: data['current']['condition']['text'],
                temp: data['current']['condition']['temp_c'],
                iconURL: data['current']['condition']['icon'],
                windSpeed: data['current']['wind_kph'],
                windPressure: data['current']['pressure_mb'],
                forecast: forecastData
            };

            return currWeatherData;


        }
        return null;

    } catch (_err) {
        return null;
    }

};

const getTide = async () => {

    try {
        const data = await AppCache.getTideData();

        if (data) {

            const tideHeightsSorted: rawTideDataType[] = data.sort((a: any, b: any) => a['sg'] - b['sg']);

            const tideData: tideDataType[] = [
                {
                    name: 'high',
                    height: tideHeightsSorted[tideHeightsSorted.length - 1]['sg'],
                    time: timeHelper(tideHeightsSorted[tideHeightsSorted.length - 1]['time'])
                },
                {
                    name: 'low',
                    height: tideHeightsSorted[0]['sg'],
                    time: timeHelper(tideHeightsSorted[0]['time'])
                }
            ];

            return tideData;
        }
        return null;

    } catch (_err) {
        return null;
    }
};

export default module.exports = {
    getWeather,
    getTide
};