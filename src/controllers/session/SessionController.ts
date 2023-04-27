import { Request, Response } from "express";
import SessionModel from "../../models/session/SessionModel";
import { v4 as uuid } from 'uuid'

const createSession = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const sessionId = uuid();

    if (!userId) {
        res.status(400).json({ message: "Invalid request: user ID is required in the request body." });
    }

    const response = await SessionModel.createSession(sessionId, userId);
    if (response) {
        res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': response.sessionExpiry, 'domain': 'localhost:8085'}).status(200).json({ text: response })
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
};

const validateSession = async (req: Request, res: Response) => {
    if (!req.cookies.sessionCookie) {
        return res.status(400).json({ message: "Invalid request: session cookie is required." });
    }

    const sessionId = req.cookies.sessionCookie.sessionId;
    const expiration = req.cookies.sessionCookie.expires;

    if (!sessionId) {
        return res.status(400).json({ message: "Invalid request: session ID is required." });
    } else if (expiration < (new Date()).toISOString()) {
        return res.status(400).json({ message: "Invalid request: session cookie is expired. Please create a new session." });
    }
    
    const response = await SessionModel.validateSession(sessionId);

    if(response !== null) {
        if (response !== false) {
            const updatedSession = await SessionModel.updateSessionExpiry(sessionId)

            if (updatedSession) {
                return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': updatedSession.sessionExpiry, 'domain': 'localhost:8085'}).status(200).json({ message: 'Session is not expired', data: response });
            } else {
                return res.status(500).json({ text: 'Could not update session expiration time.' });
            }
        } else {
            return res.status(200).json({ message: 'Session is expired' });
        }
    } else {
        return res.status(500).json({ message: 'There was an error validating the session.'}); 
    }
}

const deleteSession = async (req: Request, res: Response) => {
    if (!req.cookies.sessionCookie) {
        return res.status(400).json({ message: "Invalid request: session cookie is required." });
    }

    const sessionId = req.cookies.sessionCookie.sessionId;

    if (!sessionId) {
        return res.status(400).json({ message: "Invalid request: session ID is required." });
    }

    const response = await SessionModel.deleteSession(sessionId);
    if (response) {
        return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': '1970-01-01T00:00:00.000Z', 'domain': 'localhost:8085'}).status(200).json({ message: "Session deleted." });
    } else {
        return res.status(500).json({ message: "There was an error with the request." });
    }
};

export default module.exports = {
    createSession,
    validateSession,
    deleteSession
};