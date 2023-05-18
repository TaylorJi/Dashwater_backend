import User from "../../config/schemas/User";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../helpers/authentication/constants";

const createUser = async (email: string, password: string) => {
    try {

        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({ "email": email, "password": hash, "role": "User" });

        if (newUser) {
            return newUser;
        }
        return null;

    } catch (err) {
        return null;
    }
};


const validateUser = async (email: string, password: string) => {
    try {

        const user = await User.findOne({ "email": email });

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                return user;
            }
            return false;
        } else {
            return false;
        }

    } catch (err) {
        return null;
    }
};


export default module.exports = {
    createUser,
    validateUser
};