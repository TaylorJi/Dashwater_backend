import Session from "../../config/schemas/Session";
import User from "../../config/schemas/User";
import { getTokenKey } from "./sessionHelpers";
import jwt from "jsonwebtoken";

const createSession = async (sessionId: String, userId: String) => {
  try {
    await Session.deleteMany({ userId: userId });
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 2);

    const newSession = await Session.create({
      userId: userId,
      sessionExpiry: expirationTime.toISOString(),
      sessionId: sessionId,
    });

    if (newSession) {
      return newSession;
    }
    return null;
  } catch (_err) {
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

const validateSession = async (
  sessionId: string,
  isAdminRoute: boolean = false
) => {
  const currentTime = new Date();

  try {
    const session = await Session.findOne({ sessionId: sessionId });

    if (session) {
      if (new Date(session.sessionExpiry) < currentTime) {
        return false;
      }

      const fetchedUser = await User.findOne({ _id: session.userId });

      if (isAdminRoute && fetchedUser && fetchedUser.role !== "Admin") {
        return false;
      }

      if (fetchedUser) {
        const user: userDataType = {
          email: fetchedUser["email"],
          userId: fetchedUser["_id"],
          role: fetchedUser["role"],
        };

        return user;
      }

      return null;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

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
