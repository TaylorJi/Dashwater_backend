type metricList = {
    [key: string]: {
        [key: string]: number | boolean
    }
}

type userThresholdType = {
    userId: string,
    sensorId: number,
    deviceId: number,
    minVal: number
    maxVal: number,
    alert: boolean
}

