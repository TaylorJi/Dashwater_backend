import User from "../../config/schemas/User";

const createUser = async (email: String, password: String) => {
    try {

        const newUser = await User.create({ "email": email, "password": password, "role": "User" });

        if (newUser) {
            return newUser;
        }
        return null;

    } catch (err) {
        return null;
    }
};


const validateUser = async (email: String, password: String) => {
    try {
        const user = await User.findOne({ "email": email });

        if (user) {

            if (user.password === password) {
                return user;
            }
            return "Invalid password";

        } else {
            return "User not found";
        }

    } catch (err) {
        return null;
    }
};




export default module.exports = {
    createUser,
    validateUser
};