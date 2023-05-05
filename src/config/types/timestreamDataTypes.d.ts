type deviceMetricType = {
    [key: string]: string | number;
};

type cachedDeviceMetricType = {
    [key: string]: deviceMetricType[];
};

type deviceMetricUnitsType = {
    [key: string]: {
        [key: string]: string;
    }
};

type deviceDataType = {
    [key: string]: measureType[]
}

type measureType = {
    measureName: string;
    xAxisName: string;
    yAxisName: string;
    data: deviceMetricType[]
}
