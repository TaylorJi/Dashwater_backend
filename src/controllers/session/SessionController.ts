import { Request, Response } from "express";
import SessionModel from "../../models/session/SessionModel";

const createSession = async (req: Request, res: Response) => {
    const { sessionId, userId } = req.body;

    if (!sessionId || !userId) {
        res.status(400).json({ message: "Invalid request: session ID and user ID are required." });
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
    }
    
    const response = await SessionModel.validateSession(sessionId);

    if(response !== null) {
        if (response !== false) {
            const updatedSession = await SessionModel.updateSessionExpiry(sessionId)

            if (updatedSession) {
                res.status(200).json({ message: 'Session is not expired', data: updatedSession });
            } else {
                res.status(500).json({ text: 'Could not update session expiration time.' });
            }
        } else {
            res.status(200).json({ message: 'Session is expired' });
        }
    } else {
        res.status(500).json({ message: 'There was an error validating the session.'}); 
    }
}

const deleteSession = async (req: Request, res: Response) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        res.status(400).json({ message: "Invalid request: session ID is required." });
    }

    const response = await SessionModel.deleteSession(sessionId);
    if (response) {
        res.status(200).json({ message: "Session deleted." });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
};

export default module.exports = {
    createSession,
    validateSession,
    deleteSession
};