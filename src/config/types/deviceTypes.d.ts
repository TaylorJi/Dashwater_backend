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