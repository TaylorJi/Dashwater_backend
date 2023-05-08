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


// const getSingleUser = async (userId: string) => {
//     try {
//         const user = await User.findById(userId);
//         return user;
//     } catch (error) {
//         console.error("Error retrieving user: ", error)
//         return null;
//     }
// };


// const getSingleUser = async (idValue: string) => {
//     console.log("id value:", idValue[0]);
//     try {
//         const users = await User.findById(
//             // { _id: { $in: '644c373c859da9d501599bb2' } },
//             { _id: { $in: idValue } },
//             { email: 1, password: 1, role: 1 }
//         );

//         if (users.length !== 0) {
//             const userRecords = users.map(user => ({
//                 email: user.email,
//                 password: user.password,
//                 role: user.role
//             }));
//             return userRecords;
//         }

//         return null;
//     } catch (err) {
//         console.error("Error retrieving user.");
//         return null;
//     }
// };


const getSingleUser = async (userId: string) => {
    try {
        const users = await User.findById(
            { _id: userId },
        );
        return users // returns users as a document, but I want to update password and role 

    } catch (err) {
        console.error("Error retrieving user.");
        return null;
    }
};


const updateUser = async (userId: string, userPassword: string) => {
    try {
        const users = await User.findByIdAndUpdate(
            { _id: userId },{"password": userPassword}
        );
        return users // returns users as a document, but I want to update password and role 

    } catch (err) {
        console.error("Error retrieving user.");
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
    updateUser,
    deleteUser
};