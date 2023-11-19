import User from "../../config/schemas/User";
import bcrypt from "bcrypt";
// import { SALT_ROUNDS } from "../../helpers/authentication/constants";
import axios from "axios";

const createUser = async (sessionId: string, email: string, password: string, role: String) => {
    try {
        // const headers = {
        //     'Authorization': sessionId
        // }
        const response = await axios.post('https://c5hn9pagt5.execute-api.us-west-2.amazonaws.com/prod/user',  
            // headers: {
            //     "Authorization": `${sessionId}`
            // },
            {
                operation: "add",
                email: email,
                password: password,
                role: role
            },
            {
                headers: { Authorization: `${sessionId}` },
            }
        );

        if (response.status === 200) {
            return response.data;
        }
        // {
        //     operation: "add",
        //     email: user.email,
        //     password: user.password,
        //     role: user.role
        // },
        // {
        //     headers: { Authorization: `${sessionId}` },
        // }

        // const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        // const hash = bcrypt.hashSync(password, salt);

        // const newUser = await User.create({ "email": email, "password": hash, "role": role });

        // if (newUser) {
        //     return newUser;
        // }
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
        };
        const response = await axios.get('https://c5hn9pagt5.execute-api.us-west-2.amazonaws.com/prod/user',  {
            // headers: {
            //     "Authorization": `${sessionId}`
            // },
            headers
        });
        // const users = await User.find({}).select({ "email": 1, "password": 1, "role": 1 });

        if (response.status === 200) {
            return response.data.items;
        }
        return false;
    } catch (err) {
        return null;
    }
};


const getSingleUser = async (sessionId: string, userId: string) => {
    try {
        const headers = {
            'Authorization': sessionId
        };
        const response = await axios.get('https://c5hn9pagt5.execute-api.us-west-2.amazonaws.com/prod/user',  { // change it once provided
            headers
        });
        // const user = await User.findById(
        //     { _id: userId },
        // );
        if (response.status === 200) {
            return response.data;
        }

    } catch (err) {
        console.error("Error retrieving user.");
        return null;
    }
};


const updateUser = async (sessionId: string, user: any) => {
    try {
        // const users = await User.findByIdAndUpdate(
        //     { _id: userId }, { "email": userEmail, "password": userPassword, "role": userRole }
        // );
        const response = await axios.post('https://c5hn9pagt5.execute-api.us-west-2.amazonaws.com/prod/user',  
            {
                operation: "update",
                "old email": user.oldEmail,
                "new email": user.email,
                password: user.password,
                role: user.role
            },
            {
                headers: { Authorization: `${sessionId}` },
            }
        );
        return response.data;

    } catch (err) {
        console.error("Error retrieving user.");
        return null;
    }
};


const deleteUser = async (sessionId: string, userEmail: string) => {
    try {
        const response = await axios.post('https://c5hn9pagt5.execute-api.us-west-2.amazonaws.com/prod/user',  
            {
                operation: "delete",
                email: userEmail
            },
            {
                headers: { Authorization: `${sessionId}` },
            }
        );
        // const deletedUser = await User.findOneAndDelete({ "_id": userId });
        if (response.status === 200) {
            return response.data;
        } else {
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