import User from "../../config/schemas/User";
const bcrypt = require("bcrypt");

const loginModel =  async (userEmail: String, userPassword: String) => {
    try {
        const userDb = await User.findOne({'email': userEmail});

        if (!userDb) {
            return "No User";
        }

        if (!(await bcrypt.compare(userPassword, userDb.password))) {
            return "Password Mismatch";
        } else {
            return userDb;
        }

    } catch (err) {
        return null;
    }
}


export default module.exports = {
    loginModel
};