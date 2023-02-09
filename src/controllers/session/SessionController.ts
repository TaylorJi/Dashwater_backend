import { Request, Response } from "express";
import SessionModel from "../../models/session/SessionModel";

const createNewSession = async (req: Request, res: Response) => {
    const { sessionId, expirationTime, userId } = req.body;

    if (!sessionId || !expirationTime || !userId) {
        res.status(400).json({ message: "Invalid request: session ID, user ID, and current time are required." });
    } else if (!sessionId.match(/[0-9A-Fa-f]{24}/g)) {
        res.status(400).json({ message: "Invalid request: session ID must be a hexadecimal string of length 24." })
    } else if (!userId.match(/[0-9A-Fa-f]{24}/g)) {
        res.status(400).json({ message: "Invalid request: user ID must be a hexadecimal string of length 24." })
    } else {
        const response = await SessionModel.sessionModelTest(sessionId, expirationTime, userId);

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
};

export default module.exports = {
    createNewSession
};