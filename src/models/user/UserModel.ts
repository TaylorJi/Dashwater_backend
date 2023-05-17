import User from "../../config/schemas/User";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUser = async (email: String, password: String, role: String) => {
    try {
        const newUser = await User.create({ "email": email, "password": password, "role": role });

        if (newUser) { 
            
            const hashedUser = hashPassword(newUser.id, newUser.password)
            const payload = {
                user: {
                  id: newUser._id,
                },
              };
             const token = jwt.sign(
                payload,
                "Random-Token",
                { expiresIn: '1 days' })


            return [hashedUser, token];
        }
        return null;

    } catch (err) {
        return null;
    }
};


const validateUser = async (email: String, password: String) => {
    try {
        const user = await User.findOne({ "email": email});

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return null;
            }
            const payload = {
                user: {
                    id: user.id, 
                }
            }
            jwt.sign(
                payload,
                "Random-Token",
                { expiresIn: '1 days' },)



            return user;
        } else {
            return false;
        }

    } catch (err) {
        return null;
    }
};


const getUser = async () => {
    try {
        const users = await User.find({}).select({ "email": 1, "password": 1, "role": 1 });

        if (users.length !== 0) {
            return users;
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
        let hashUpdatedUser;

        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId }, { "email": userEmail, "password": userPassword, "role": userRole }
        );
        if (updatedUser) {
            hashUpdatedUser = hashPassword(userId, updatedUser.password);
        } else {
            console.log("Hasing error.")

        }
      

        return hashUpdatedUser;

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


const hashPassword = async (userId: string, password: string) => {
    try {
        const salt = await bcrypt.genSalt(10); // version of hashing
        const hashedPassword =  await bcrypt.hash(password, salt); // hash password

        const user = await User.findByIdAndUpdate(
            { _id: userId }, { "password": hashedPassword }
        );
        return user;

    } catch (err) {
        console.error("Error retrieving user.");
        return null;
    }


}

export default module.exports = {
    createUser,
    validateUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
};