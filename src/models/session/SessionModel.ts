import Session from "../../config/schemas/Session";

const sessionModelTest = async (sessionId: String, expirationTime: String, userId: String) => {
    try {
        const newSession = await Session.findOneAndUpdate({'sessionId': sessionId}, {'sessionId': sessionId, 'userId': userId, 'session_expiry': expirationTime}, { new: true, upsert: true });

        if(newSession) {
            return newSession;
        }
        return null;
    } catch (err) {
        return null;
    }
}

export default module.exports = {
    sessionModelTest
};