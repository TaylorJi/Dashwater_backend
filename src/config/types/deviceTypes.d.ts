type deviceType = {
    id: number,
    name: string,
    description: string,
    locationX: number,
    locationY: number,
    active: boolean,
    sensors: sensorType[]
};

type sensorType = {
    id: number,
    deviceId: number,
    lastCalibrationDate: string,
    minCalibrationPts: number,
    metric: string,
    default_metric: string,
    calibrated: boolean,
    enabled: boolean,
    min_val: number,
    max_val: number,
};

type calibrationPointType = {
    id: number,
    digitalValue: number,
    physicalValue: number,
    sensorId: string
};
