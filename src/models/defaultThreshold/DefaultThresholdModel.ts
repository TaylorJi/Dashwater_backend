import DefaultThreshold from "../../config/schemas/DefaultThreshold";

const createDefaultThreshold = async (metric: string, defaultMin: number, defaultMax: number) => {
    try {
        const newDefaultThreshold = await DefaultThreshold.create({ "metric": metric, "defaultMin": defaultMin, "defaultMax": defaultMax });

        if (newDefaultThreshold) {
            return newDefaultThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const updateDefaultThreshold = async (metric: string, updateData: { [key: string]: number }) => {
    try {
        // const updateData: { [key: string]: number } = {};

        // if (defaultMin) {
        //     updateData["defaultMin"] = defaultMin;
        // }

        // if (defaultMax) {
        //     updateData["defaultMax"] = defaultMax;
        // }

        const updatedDefaultThreshold = await DefaultThreshold.findOneAndUpdate({ "metric": metric }, updateData, {new: true});

        if (updatedDefaultThreshold) {
            return updatedDefaultThreshold;
        }
        return false;

    } catch (err) {
        return null;
    }
}




export default module.exports = {
    createDefaultThreshold,
    updateDefaultThreshold
}