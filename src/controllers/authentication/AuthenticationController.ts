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

// It may be possible to combine userAuth and adminAuth into one function, but it would be harder to understand for future teams
// One appraoch would be to pass a flag, isAdmin, from the calling route, which would then be passes from controller to model
const userAuth = async ( req: Request, res: Response, next: NextFunction ) => {
    //console.log(req.cookies)
    if (!req.cookies.sessionCookie) {
        res.status(403).json({ message: "No cookie found in request. You must be logged in to perform this action." })
    } else {
        const sessionId = req.cookies.sessionCookie.sessionId;
        if (sessionId) {
            const sessionCheck = await SessionModel.validateSession(sessionId, false);
    
            if (sessionCheck) {
                next();
            } else {
                res.status(403).json({ message: "You must be logged in to perform this action." });
            }
        } else {
            res.status(403).json({ message: "You must be logged in to perform this action." });
        }
    }
}

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.sessionCookie) {
        res.status(403).json({ message: "No cookie found in request. You must be logged in to perform this action." })
    } else {
        const sessionId = req.cookies.sessionCookie.sessionId;
        if (sessionId) {
            const sessionCheck = await SessionModel.validateSession(sessionId, true);
    
            if (sessionCheck) {
                next();
            } else {
                res.status(403).json({ message: "You must be logged in and be an admin to perform this action." });
            }
        } else {
            res.status(403).json({ message: "You must be logged in and be an admin to perform this action." });
        }
    }
}

export default module.exports = {
    authControllerTest,
    userAuth,
    adminAuth
};