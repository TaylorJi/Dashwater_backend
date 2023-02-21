import User from "../../config/schemas/User";
const bcrypt = require("bcrypt");

const loginModel =  async (userEmail: String, userPassword: String) => {
    try {
        const userDb = await User.findOne({'email': userEmail});

        if (!userDb) {
            return { message: "User not found"};
        }

        try {
            const passwordIsValid = await bcrypt.compare(userPassword, userDb.password)

            if (passwordIsValid) {
                return { message: "Logged in", userDb}
            }

            return { message: "Invalid password"}

        } catch (err) {
            return { message: "Server error", err};
        }

    } catch (err) {
        return { message: "Database error", err };
    }
}


export default module.exports = {
    loginModel
};