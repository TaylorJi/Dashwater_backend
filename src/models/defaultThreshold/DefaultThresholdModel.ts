import DefaultThreshold from "../../config/schemas/DefaultThreshold";

const createDefaultThreshold = async (metric: string, defaultMin: number, defaultMax: number) => {
    try {
        const newDefaultThreshold = await DefaultThreshold.create({ "metric": metric, "defaultMin": defaultMin, "defaultMax": defaultMax });

        if (newDefaultThreshold) {
            return newDefaultThreshold;
        }
        return false;

    } catch (err) {
        console.log(err);
        return null;
    }
}


const updateDefaultThreshold = async (metric: string, updateData: defThresholdUpdateData) => {
    try {
        let updatedDefaultThreshold;

        if (Object.keys(updateData).length === 1 && updateData.defaultMin) {
            updatedDefaultThreshold = await DefaultThreshold.findOneAndUpdate({ "metric": metric, "defaultMax": { $gt: updateData.defaultMin } }, { $set: updateData } , { new: true });
        } else if (Object.keys(updateData).length === 1 && updateData.defaultMax) {
            updatedDefaultThreshold = await DefaultThreshold.findOneAndUpdate({ "metric": metric, "defaultMin": { $lt: updateData.defaultMax } }, { $set: updateData } , { new: true });
        } else {
            updatedDefaultThreshold = await DefaultThreshold.findOneAndUpdate({ "metric": metric }, { $set: updateData } , { new: true });
        }


        if (updatedDefaultThreshold) {
            return updatedDefaultThreshold;
        }
        return false;

    } catch (err) {
        console.log(err)
        return null;
    }
}


const deleteDefaultThreshold = async (metric: string) => {
    try {
        const deletedDefaultThreshold = await DefaultThreshold.findOneAndDelete({ "metric": metric });

        if (deletedDefaultThreshold) {
            return deletedDefaultThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getAllDefaultThresholds = async () => {
    try {
        const defaultThresholds = await DefaultThreshold.find({})

        if (defaultThresholds.length !== 0) {
            return defaultThresholds;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getSingleDefaultThreshold = async (metric: string) => {
    try {
        const defaultThreshold =  await DefaultThreshold.findOne({ "metric": metric });

        if (defaultThreshold) {
            return defaultThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}



export default module.exports = {
    createDefaultThreshold,
    updateDefaultThreshold,
    deleteDefaultThreshold,
    getAllDefaultThresholds,
    getSingleDefaultThreshold
}