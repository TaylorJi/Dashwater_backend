const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import User from "../../config/schemas/User";

const createUser = async (email: String, password: String) => {
  try {
    const newUser = await User.create({
      email: email,
      password: password,
      role: "User",
    });


    // hash password, work
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

     // return jwt
     const payload = {
        user: {
          id: newUser._id,

        },
      };

      const token = jwt.sign(
        payload,
        "random-token",
        { expiresIn: '1 days' },
      );


    if (newUser) {
      return [newUser, token];
    }
    return null;
  } catch (err) {
    return null;
  }
};

const validateUser = async (email: String, password: String) => {
  try {
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      // const token = jwt.sign(
      //     {
      //         userId: user._id,
      //         userEmail: user.email,
      //     },
      //     "RANDOM-TOKEN", {
      //         expiresIn: "2h"
      //     }
      // )
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
    const users = await User.find({}).select({
      email: 1,
      password: 1,
      role: 1,
    });

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
    const users = await User.findById({ _id: userId });
    return users;
  } catch (err) {
    console.error("Error retrieving user.");
    return null;
  }
};

const updateUser = async (
  userId: string,
  userEmail: string,
  userPassword: string,
  userRole: string
) => {
  try {
    const users = await User.findByIdAndUpdate(
      { _id: userId },
      { email: userEmail, password: userPassword, role: userRole }
    );
    return users; // returns users as a document, but I want to update password and role
  } catch (err) {
    console.error("Error retrieving user.");
    return null;
  }
};

// const ObjectId = require('mongoose').Types.ObjectId;
//TJ
const deleteUser = async (userId: string) => {
  try {
    console.log(userId);
    const deletedUser = await User.findOneAndDelete({ _id: userId });
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
  deleteUser,
};
