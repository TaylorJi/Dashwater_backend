type weatherDataType = {
    currWeather: string;
    temp: number;
    iconURL: string;
    windSpeed: number;
    windDir: string;
    windDeg: number;
    windPressure: number;
    forecast: weatherForecastType[];
};

type weatherForecastType = {
    weekday: string;
    iconURL: string;
    high: number;
    low: number;
};

type tideDataType = {
    height: number;
    time: string;
};

type rawTideDataType = {
    sg: number;
    time: string;
}

type tideDataResType = {
    high: tideDataType;
    low: tideDataType;
    allData: tideDataType[];
};