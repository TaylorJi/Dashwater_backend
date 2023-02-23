import axios from "axios";

const getWeather = async () => {

    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=steveston&aqi=yes`);
        if (response) {

            const data = response.data;
            const forecastData: weatherForecastType[] = [];

            // Object.keys(data['forecast']).map(())

        }
        return null;

    } catch (err) {
        console.log(err);
        return null;
    }

};

export default module.exports = {
    getWeather
};