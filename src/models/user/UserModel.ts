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
        const user = await User.findOne({ "email": email, "password": password});

        if (user) {
            return user;
        } else {
            return false;
        }

    } catch (err) {
        return null;
    }
};

//20230505 EJ
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
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        console.error("Error retrieving user: ", error)
        return null;
    }
};

// const ObjectId = require('mongoose').Types.ObjectId;
//TJ
const deleteUser = async (userId: string) => {
    try {
        console.log(userId)
      const deletedUser = await User.findOneAndDelete({"_id": userId});
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
    deleteUser
};