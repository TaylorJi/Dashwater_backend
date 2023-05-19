import User from "../../config/schemas/User";

const createUser = async (email: String, password: String) => {
    try {

        const newUser = await User.create({ "email": email, "password": password, "role": "User" });

        if (newUser) {
            console.log(newUser._id.toString())
            return newUser._id.toString();
        }
        return null;

    } catch (err) {
        console.log(err)
        return null;
    }
};


const validateUser = async (email: String, password: String) => {
    try {
        const user = await User.findOne({ "email": email, "password": password});

        if (user) {
            return user;
        } else {
            return false;
        }

    } catch (err) {
        return null;
    }
};

const getUserEmail = async (userId: any) => {
    var ObjectId = require('mongoose').Types.ObjectId; 
    const id = new ObjectId(userId);
    try {
        const user = await User.findById({"_id": id});
        if (user) {
            return user.email;
        } else {
            return false;
        }
    } catch (err) {
        return null;
    }
}


export default module.exports = {
    createUser,
    validateUser,
    getUserEmail
};