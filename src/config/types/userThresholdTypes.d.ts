type metricList = {
    [key: string]: {
        [key: string]: number | boolean
    }
}


/////////////////// NEW TYPE USED IN PREHOOOK (SELF) ///////////////////////////
type userThresholdDoc = {
    userId: Schema.Types.ObjectId,
    deviceId: number,
    // metricList: metricList
    metricList: {
        [key: string]: {
            [key: string]: number | boolean | null
        }
    }
}
////////////////////////////////////////////////////////////////////////////////