import User from "../../config/schemas/User";
const bcrypt = require("bcrypt");

const registerModel = async (registerEmail: String, registerPassword: String) => {
    try {
        console.log(registerEmail);
        console.log(registerPassword);

        const hashedPassword = await bcrypt.hash(registerPassword, 10);

        console.log(hashedPassword);

        const newUser = await User.create({ email: registerEmail, password: hashedPassword, role: 'User' });

        console.log(newUser);

        if (newUser) {
            return "User created";
        } else {
            return "Error";
        }
    } catch (err) {
        return null;
    }
}


export default module.exports = {
    registerModel
};