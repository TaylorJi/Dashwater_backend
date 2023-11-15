import Session from "../../config/schemas/Session";
// import User from "../../config/schemas/User";
import { getTokenKey } from "./sessionHelpers";
import jwt from "jsonwebtoken";

// previous team logic
// const createSession = async (sessionId: string, userId: string, userRole: string) => {
//     try {
//         await Session.deleteMany({"userId": userId, "sessionId": sessionId})
//         const expirationTime = new Date();
//         expirationTime.setHours(expirationTime.getHours() + 2);

//     const newSession = await Session.create({
//       userId: userId,
//       sessionExpiry: expirationTime.toISOString(),
//       sessionId: sessionId, 
//       userRole: userRole,
//       isValid: true
//     });

//     if (newSession) {
//       return newSession;
//     }
//     return null;
//   } catch (err) {
//     console.log('SessionModel: ' + err)
//     return null;
//   }
// };

let sessions: any = {}

const createSession = async (sessionId: string, userId: string, userRole: string) => {
  try {
      // Assuming that you want to create a session object and return it.
      // Since there's no database interaction, we'll just create a JavaScript object.
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 2);

      const newSession = {
          userId: userId,
          sessionExpiry: expirationTime.toISOString(),
          sessionId: sessionId,
          userRole: userRole,
          isValid: true
      };
      // putting the session into sessions array, otherwise we have to use DB to store the session
      sessions[sessionId] = newSession;
      console.log(sessions)

      return newSession;
  } catch (err) {
      console.log('Error creating session: ' + err)
      return null;
  }
};


const deleteSession = async (sessionId: string) => {
  try {
    const oldSession = await Session.find({ sessionId: sessionId });
    if (oldSession) {
      try {
        const deletedSession = await Session.deleteOne({
          sessionId: sessionId,
        });

        if (deletedSession.deletedCount) {
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    }

    return true;
  } catch (err) {
    return false;
  }
};


const validateSession = async (sessionId: string) => {
  try {
    console.log("Inside session model validate session");

    if (!sessionId) {
      return false;
    } else {
      return true;
    }
 
  } catch (err) {
    return null;
  }
}


// const validateSession = async (
//   sessionId: string,
//   // isAdminRoute: boolean = false
// ) => {
//   // const currentTime = new Date();

//   try {
//     console.log("Inside session model validate session");
//     const session = await Session.findOne({ sessionId: sessionId });
//     console.log(session);
//     if (!session) {
//       return false;
//     } else {
//       return true;
//     }


//     // if (session) {
//     //   if (new Date(session.sessionExpiry) < currentTime) {
//     //     return false;
//     //   }

//     //   const fetchedUser = await User.findOne({ _id: session.userId });
//     //   console.log(fetchedUser)
//     //   console.log(fetchedUser?.role)

//     //   if (isAdminRoute && fetchedUser && fetchedUser.role !== "Admin") {
//     //     return false;
//     //   }

//     //   if (fetchedUser) {
//     //     const user: userDataType = {
//     //       email: fetchedUser["email"],
//     //       userId: fetchedUser["_id"],
//     //       role: fetchedUser["role"],
//     //     };

//     //     return user;
//     //   }

//     //   return null;
//     // } else {
//     //   return null;
//     // }
//   } catch (err) {
//     return null;
//   }
// };

const updateSessionExpiry = async (sessionID: string) => {
  try {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 2);
    const updatedSession = await Session.findOneAndUpdate(
      { sessionId: sessionID },
      { sessionExpiry: expirationTime.toISOString() }
    );

    if (updatedSession) {
      return updatedSession;
    }
    return null;
  } catch (_err) {
    return null;
  }
};

const getJWT = async (username: string, role: string) => {
  try {
    const key = await getTokenKey();
    if (key) {
      let token = jwt.sign({ username: username, role: role }, key);
      return token;
    }
    return null;
  } catch (_err) {
    return null;
  }
};

export default module.exports = {
  createSession,
  deleteSession,
  validateSession,
  updateSessionExpiry,
  getJWT,
};
