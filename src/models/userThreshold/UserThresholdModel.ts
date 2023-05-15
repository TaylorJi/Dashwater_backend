import UserTheshold from "../../config/schemas/UserThreshold";

const createUserThreshold = async (userId: String, deviceId: Number, metricId: String, min: Number, max: Number) => {
    try {

        const newUserThreshold = await UserTheshold.create({ "userId": userId, "deviceId": deviceId, "metricId": metricId, "customMin": min, "customMax": max });

        if (newUserThreshold) {
            return newUserThreshold._id.toString();
        }
        return null;

    } catch (err) {
        console.log(err)
        return null;
    }
};

const updateUserThreshold = async (userId: String, deviceId: Number, metricId: String, min: Number, max: Number) => {
    try {
        console.log("inside update")
        const updatedUserThreshold = await UserTheshold.findOneAndUpdate({ "userId": userId, "deviceId": deviceId, "metricId": metricId}, { "customMin": min, "customMax": max })

        if (updatedUserThreshold) {
            console.log("success update")
            return updatedUserThreshold;
        }
        return false;

    } catch (err) {
        console.log(err)
        return null;
    }
}


// const getAllThreshold = async () => {
//     try {
//         const thresholds = await UserTheshold.find({});

//         if (thresholds.length !== 0) {
//             console.log("successful thresholds list retrieval")
//             console.log("list has " + thresholds.length + "elements")
//             console.log(thresholds);
//             // for (let index = 0; index < thresholds.length; index++) {
//             //     const element = thresholds[index];
//             //     console.log(element["userId"])
                
//             // }
//             return thresholds;
//         }
//         return false;
//     } catch (err) {
//         return null;
//     }
// }

const getAllThreshold = async () => {
    try {
        const thresholds = await UserTheshold.find({});
        var thresholdList:any[] = [];

        if (thresholds.length !== 0) {
            console.log("successful thresholds list retrieval")
            console.log("list has " + thresholds.length + "elements")
            // console.log(thresholds);
            // for (let index = 0; index < thresholds.length; index++) {
            //     const element = thresholds[index];
            //     console.log(element["userId"])
                
            // }
            thresholds.forEach((element) => {
                // console.log(element);
                thresholdList.push(element.toJSON());
            });
            return thresholdList;
        }
        return null;
    } catch (err) {
        return null;
    }
}


export default module.exports = {
    createUserThreshold,
    updateUserThreshold,
    getAllThreshold
};
