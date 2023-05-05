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