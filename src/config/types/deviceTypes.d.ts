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

//////////////////////
type deviceType = {
    // _id?: Schema.Types.ObjectId,
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
///////////////////////