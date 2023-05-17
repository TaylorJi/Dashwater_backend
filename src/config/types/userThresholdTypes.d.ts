type metricList = {
    [key: string]: {
        [key: string]: number | boolean
    }
}

type metric = {
    customMin: number,
    customMax: number,
    isWarning: boolean
}

