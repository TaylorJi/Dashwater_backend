type weatherDataType = {
    currWeather: string;
    temp: number;
    iconURL: string;
    windSpeed: string;
    windPressure: string;
    forecast: weatherForecastType[];
};

type weatherForecastType = {
    weekday: string;
    iconURL: string;
    high: number;
    low: number;
};