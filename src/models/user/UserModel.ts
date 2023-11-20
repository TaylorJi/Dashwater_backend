import User from "../../config/schemas/User";
import bcrypt from "bcrypt";
// import { SALT_ROUNDS } from "../../helpers/authentication/constants";
import axios from "axios";
import { USER_URL } from "../../config/Environments";

const createUser = async (sessionId: string, email: string, password: string, role: String) => {
    try {
        const response = await axios.post(USER_URL,  
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
        const response = await axios.get(USER_URL,  {
            headers
        });

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
        const response = await axios.post(`${USER_URL}/role`,  
        {
            email: userId
        },
        {
            headers: { Authorization: `${sessionId}` },
        });
        if (response.status === 200) {
            console.log('getSingleUser: ' + JSON.stringify(response.data));
            return response.data.body;
        }

    } catch (err) {
        console.error("Error retrieving user.");
        return null;
    }
};


const updateUser = async (sessionId: string, user: any) => {
    try {
        const response = await axios.post(USER_URL,  
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
        const response = await axios.post(USER_URL,  
            {
                operation: "delete",
                email: userEmail
            },
            {
                headers: { Authorization: `${sessionId}` },
            }
        );
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