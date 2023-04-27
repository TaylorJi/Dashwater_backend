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
        // dissolvedOxygen: {
        //     isAvailable: boolean
        // },
        // electricalConductivity: {
        //     isAvailable: boolean
        // },
        // liquidLevel: {
        //     isAvailable: boolean
        // },
        // ph: {
        //     isAvailable: boolean
        // },
        // temperature: {
        //     isAvailable: boolean
        // },
        // totalDissolvedSolids: {
        //     isAvailable: boolean
        // },
        // turbidity: {
        //     isAvailable: boolean
        // },
        // waterFlow: {
        //     isAvailable: boolean
        // },
        // waterLevel: {
        //     isAvailable: boolean
        // },
        // waterPressure: {
        //     isAvailable: boolean
        // },
        // co2Level: {
        //     isAvailable: boolean
        // },
        // ch4Level: {
        //     isAvailable: boolean
        // }
    }
}
///////////////////////