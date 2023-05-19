type deviceMetricType = {
    [key: string]: string | number;
};

type cachedDeviceMetricType = {
    [key: string]: {
        [key: string]: deviceMetricType[];
    }
};

type deviceMetricUnitsType = {
    [key: string]: {
        [key: string]: string;
    }
};

type metricHighLow = {
    high: number,
    low: number
};

type deviceHighLow = {
    [key: string]: {
        [key: string]: metricHighLow
    }
};