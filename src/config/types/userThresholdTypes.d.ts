type metricList = {
    [key: string]: {
        customMin: number,
        customMax: number,
        isWarning: boolean
    }
}


/////////////////// NEW TYPE USED IN PREHOOOK (SELF) ///////////////////////////
type userThresholdDoc = {
    userId: Schema.Types.ObjectId,
    deviceId: number,
    metricList: metricList
    // metricList: {
    //     dissolvedOxygen: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     electricalConductivity: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     liquidLevel: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     ph: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     temperature: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     totalDissolvedSolids: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     turbidity: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     waterFlow: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     waterLevel: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     waterPressure: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     co2Level: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     },
    //     ch4Level: {
    //         customMin: number,
    //         customMax: number,
    //         isWarning: boolean
    //     }
    // }
}
////////////////////////////////////////////////////////////////////////////////