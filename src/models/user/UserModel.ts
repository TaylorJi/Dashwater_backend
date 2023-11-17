import User from "../../config/schemas/User";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../helpers/authentication/constants";
import axios from "axios";

const createUser = async (email: string, password: string, role: String) => {
    try {

        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({ "email": email, "password": hash, "role": role });

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

const getUser = async (sessionId: string) => {
    try {
        const headers = {
            'Authorization': sessionId
        }
        const response = await axios.get('https://c5hn9pagt5.execute-api.us-west-2.amazonaws.com/prod/user',  {
            // headers: {
            //     "Authorization": `${sessionId}`
            // },
            headers
        });
        console.log("getUser status: " + JSON.stringify(response.data));
        // const users = await User.find({}).select({ "email": 1, "password": 1, "role": 1 });

        if (response.status === 200) {
            return response.data.items;
        }
        return false;
    } catch (err) {
        return null;
    }
};


const getSingleUser = async (userId: string) => {
    try {
        const user = await User.findById(
            { _id: userId },
        );
        return user;

    } catch (err) {
        console.error("Error retrieving user.");
        return null;
    }
};


const updateUser = async (userId: string, userEmail: string, userPassword: string, userRole: string) => {
    try {
        const users = await User.findByIdAndUpdate(
            { _id: userId }, { "email": userEmail, "password": userPassword, "role": userRole }
        );
        return users;

    } catch (err) {
        console.error("Error retrieving user.");
        return null;
    }
};


const deleteUser = async (userId: string) => {
    try {
        const deletedUser = await User.findOneAndDelete({ "_id": userId });
        if (deletedUser) {
            console.log(`Deleted user with ID ${userId}`);
            return deletedUser;
        } else {
            console.log(`User with ID ${userId} not found`);
            return false;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};


export default module.exports = {
    createUser,
    validateUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
};