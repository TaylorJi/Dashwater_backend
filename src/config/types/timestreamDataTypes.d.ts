type deviceMetricType = {
    [key: string]: string | number;
};

type cachedDeviceMetricType = {
    [key: string]: deviceMetricType[];
};