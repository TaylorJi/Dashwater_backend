// types for AWS API Gateway

type deviceSettingType = {
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

// types for mongoDB models

type metricListBoolean = {
    [key: string]: {
        isAvailable: boolean
    }
}

type deviceUpdateDataType = {
    location?: {
        type: "Point",
        coordinates: [number]
    },
    [key: string]: {
        isAvailable: boolean
    }
}


type deviceType = {
    deviceId: number,
    location: {
        type: "Point",
        coordinates: [number]
    },
    metricList: {
        [key: string]: {
            isAvailable: boolean
        }
    }
}
