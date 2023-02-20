import { Request, Response } from "express";
import SessionModel from "../../models/session/SessionModel";

const createSession = async (req: Request, res: Response) => {
    const { sessionId, expirationTime, userId } = req.body;

    if (!sessionId || !expirationTime || !userId) {
        res.status(400).json({ message: "Invalid request: session ID, user ID, and current time are required." });
    } else if (!sessionId.match(/[0-9A-Fa-f]{24}/g)) {
        res.status(400).json({ message: "Invalid request: session ID must be a hexadecimal string of length 24." })
    } else if (!userId.match(/[0-9A-Fa-f]{24}/g)) {
        res.status(400).json({ message: "Invalid request: user ID must be a hexadecimal string of length 24." })
    } else {
        const response = await SessionModel.createSession(sessionId, expirationTime, userId);

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
};

const validateSession = async (req: Request, res: Response) => {
    const { sessionId } = req.body;
    const response = await SessionModel.validateSession(sessionId);

    if(response === "Not found") {
        res.status(500).json({ text: "Session not found." });
    } else if (response === "Expired") {
        const deleteResponse = await SessionModel.deleteSession(sessionId);
        if(deleteResponse) res.status(500).json({ text: "Session is expired." });
        else res.status(500).json({ text: "Error while deleting session." });
    } else {
        const futureTime = new Date();
        futureTime.setHours(futureTime.getHours() + 2);

        const updatedSession = await SessionModel.updateSessionExpiry(sessionId, futureTime.toISOString())
        if(updatedSession) res.status(200).json({ data: response });
        else res.status(500).json({ text: "Could not update session expiration time." });
    }
}

export default module.exports = {
    createSession,
    validateSession
};