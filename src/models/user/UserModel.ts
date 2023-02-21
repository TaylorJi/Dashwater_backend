import User from "../../config/schemas/User";

const bcrypt = require("bcrypt");

const createNewUser = async (registerEmail: String, registerPassword: String) => {
    try {

        const hashedPassword = await bcrypt.hash(registerPassword, 10);

        try {
            const newUser = await User.create({ email: registerEmail, password: hashedPassword, role: 'User' });

            if (newUser) {
                return { message: "User created", newUser};
            }

            return { message: "User cannot be created"};

        } catch (err) {
            return { message: "Database error", err};
        }

    } catch (err) {

        return { message: "Failed to hash password", err};
    }
}


export default module.exports = {
    createNewUser
};