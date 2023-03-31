import { NextFunction, Request, Response } from "express";
import OrdersModel from "../../models/authentication/AuthenticationModel";
import SessionModel from "../../models/session/SessionModel";

const authControllerTest = (req: Request, res: Response) => {

    const { msg } = req.body;

    if (!msg) {
        res.status(400).json({ message: "Invalid request body." });

    } else {

        // casting is for demo, postman sends strings only
        const response = OrdersModel.authModelTest(msg);

        if (response) {
            res.status(200).json({ text: response });

        } else {
            res.status(500).json({ message: 'There was an error with the request.' });
        }
    }

};

const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.cookies.sessionCookie.sessionId;
    if (sessionId) {
        const sessionCheck = await SessionModel.validateSession(sessionId);

        if (sessionCheck) {
            next();
        } else {
            res.status(403).json({ message: "You must be logged in to perform this action." });
        }
    } else {
        res.status(403).json({ message: "You must be logged in to perform this action." });
    }
}

export default module.exports = {
    authControllerTest,
    validateAuth
};