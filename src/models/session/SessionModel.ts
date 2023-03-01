import Session from "../../config/schemas/Session";
import User from "../../config/schemas/User";

const createSession = async (sessionId: String, userId: String) => {
    try {
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 2);

        const newSession = await Session.create({
                "userId": userId,
                "sessionExpiry": expirationTime.toISOString(),
                "sessionId": sessionId
        });

        if(newSession) {
            return newSession;
        }
        return null;
    } catch (_err) {
        return null;
    }
}

const deleteSession = async (sessionId: string) => {
    try {
        const oldSession = await Session.find({"sessionId": sessionId});
        if (oldSession) {
            try {
                const deletedSession = await Session.deleteOne({"sessionId": sessionId});

                if (deletedSession.deletedCount) return true;
                return false;
            } catch (err) {
                return false;
            }
        }

        return true;
    } catch (err) {
        return false;
    }
}

const validateSession = async (sessionId: string) => {
    const currentTime = new Date();

    try {
        const session = await Session.findOne({"sessionId": sessionId});

        if (session && new Date(session.sessionExpiry) > currentTime) {
            const fecthedUser = await User.findOne({"_id": session.userId});

            if (fecthedUser) {
                const user: userDataType = {
                    email: fecthedUser['email'], 
                    userId: fecthedUser['_id'], 
                    role: fecthedUser['role']
                };

                return user;
            }
            
            return false;
        } else {
            return false;
        }
    } catch (err) {
        return null;
    }
}

const updateSessionExpiry = async (sessionID: string) => {
    try {
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 2);
        const updatedSession = await Session.findOneAndUpdate({"sessionId": sessionID}, {"sessionExpiry": expirationTime.toISOString()});

        if (updatedSession) {
            return updatedSession;
        }
        return null;
    } catch (_err) {
        return null;
    }
}

export default module.exports = {
    createSession,
    deleteSession,
    validateSession,
    updateSessionExpiry
};