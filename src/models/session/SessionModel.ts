import Session from "../../config/schemas/Session";
import User from "../../config/schemas/User";

const createSession = async (sessionId: String, expirationTime: String, userId: String) => {
    try {
        const newSession = await Session.create({
                "userId": userId,
                "session_expiry": expirationTime,
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

// const getSession = async (sessionId: String) => {
//     try {
//         const existingSession = await Session.findOne({"sessionId": sessionId});

//         if (existingSession) {
//             return existingSession;
//         }
//         return null;
//     } catch (err) {
//         return null;
//     }
// }

const deleteSession = async (sessionId: string) => {
    try {
        const oldSession = await Session.find({"sessionId": sessionId});
        if (oldSession) {
            try {
                const deletedSession = await Session.deleteOne({"sessionId": sessionId});

                if (deletedSession) return true;
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

        if (session && new Date(session.session_expiry) > currentTime) {
            const user = await User.findOne({"_id": session.userId});
            
            return user;
        } else if (!session) {
            return "Not found"
        } else {
            return "Expired"
        }
    } catch (err) {
        return null;
    }
}

const updateSessionExpiry = async (sessionID: string, newExpiry: string) => {
    try {
        const updatedSession = await Session.findOneAndUpdate({"sessionId": sessionID}, {"session_expiry": newExpiry});

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