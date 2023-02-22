import { Request, Response } from "express";
import SessionModel from "../../models/session/SessionModel";

const createSession = async (req: Request, res: Response) => {
    const { sessionId, userId } = req.body;

    if (!sessionId || !userId) {
        res.status(400).json({ message: "Invalid request: session ID and user ID are required." });
    } else if (!sessionId.match(/[0-9A-Fa-f]{24}/g)) {
        res.status(400).json({ message: "Invalid request: session ID must be a hexadecimal string of length 24." })
    } else if (!userId.match(/[0-9A-Fa-f]{24}/g)) {
        res.status(400).json({ message: "Invalid request: user ID must be a hexadecimal string of length 24." })
    }

    const response = await SessionModel.createSession(sessionId, userId);
    if (response) {
        res.status(200).json({ text: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
};

const validateSession = async (req: Request, res: Response) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        res.status(400).json({ message: "Invalid request: session ID is required." });
    } else if (!sessionId.match(/[0-9A-Fa-f]{24}/g)) {
        res.status(400).json({ message: "Invalid request: session ID must be a hexadecimal string of length 24." })
    }
    
    const response = await SessionModel.validateSession(sessionId);

    if (!response) {
        const deleteResponse = await SessionModel.deleteSession(sessionId);
        if(deleteResponse) res.status(404).json({ text: "No active sessions found." });
        else res.status(500).json({ text: "There was an error while deleting expired sessions." });
    } else {
        const updatedSession = await SessionModel.updateSessionExpiry(sessionId)
        if(updatedSession) res.status(200).json({ data: response });
        else res.status(500).json({ text: "Could not update session expiration time." });
    }
}

export default module.exports = {
    createSession,
    validateSession
};