import UserTheshold from "../../config/schemas/UserThreshold";

const createUserThreshold = async (userId: String, deviceId: Number) => {
    try {

        const newUserThreshold = await UserTheshold.create({ "userId": userId, "deviceId": deviceId });

        if (newUserThreshold) {
            return newUserThreshold._id.toString();
        }
        return null;

    } catch (err) {
        console.log(err)
        return null;
    }
};

const updateUserThreshold = async (userId: String, deviceId: Number, min: Number, max: Number) => {
    try {
        console.log("inside update")
        const updatedUserThreshold = await UserTheshold.findOneAndUpdate({ "userId": userId, "deviceId": deviceId}, { "customMin": min, "customMax": max })

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

export default module.exports = {
    createUserThreshold,
    updateUserThreshold
};
