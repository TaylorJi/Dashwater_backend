type metricListBoolean = {
    [key: string]: {
        isAvailable: boolean
    }
}


type deviceUpdateDataType = {
    deviceId?: number,
    location?: {
        type: "Point",
        coordinates: [number]
    },
    [key: string]: {
        isAvailable: boolean
    }
}