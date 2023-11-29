import { Request, Response } from "express";
import SessionModel from "../../models/session/SessionModel";
// import { v4 as uuid } from 'uuid'
import { DOMAIN } from "../../helpers/authentication/constants";

// const createSession = async (req: Request, res: Response) => {
//     const { userId } = req.body;
//     let sessionId = null;

//     if (req.cookies.sessionCookie) {
//         console.log(req.cookies.sessionCookie)
//         sessionId = req.cookies.sessionCookie.sessionId;
//         console.log(sessionId)
//     } else{
//         // if no session cookie exists, create a new session ID
//         console.log("no cookie, so create a new session ID")
//         sessionId = uuid();
//     }
    
//     if (!userId) {
//         return res.status(400).json({ 
//             sucess: false,
//             message: "Invalid request: user ID is required in the request body."
//          });
//     }


//     const response = await SessionModel.createSession(sessionId, userId);
//     if (response) {
//         // return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': response.sessionExpiry, DOMAIN: DOMAIN}, {"sameSite":"none", 'secure': true}).status(200).json({ user: response })
//         return res.cookie('sessionCookie', 
//         {'sessionId': sessionId, 'expires': response.sessionExpiry, 'domain': 'localhost:8085'})
//         .status(200)
//         .json({success: true, user: response })
//     } else {
//         return res.status(500).json({success: false, message: "There was an error with the request." });
//     }
// };

// const validateSession = async (req: Request, res: Response) => {
//     console.log("validate function is called")
//     const idToken = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
//     console.log("ID Token:", idToken);

//     if (!req.cookies.sessionCookie) {
//         console.log("no cookie")
//         return res.status(400).json({ message: "Invalid request: session cookie is required." });
//     }

//     const sessionId = req.cookies.sessionCookie.sessionId;
//     const expiration = req.cookies.sessionCookie.expires;
//     console.log(sessionId)
//     console.log(expiration)

//     if (!sessionId) {
//         return res.status(400).json({ message: "Invalid request: session ID is required." });
//     } else if (expiration < (new Date()).toISOString()) {
//         return res.status(400).json({ message: "Invalid request: session cookie is expired. Please create a new session." });
//     }
    
//     const response = await SessionModel.validateSession(sessionId);
//     console.log(response)

//     if(response !== null) {
//         if (response) {
//             const updatedSession = await SessionModel.updateSessionExpiry(sessionId)

//             if (updatedSession) {
//                 return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': updatedSession.sessionExpiry, 'domain': 'localhost:8085'}).status(200).json({ user: 'Session is not expired', data: response });
//                 // return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': updatedSession.sessionExpiry, 'domain': DOMAIN}, {'sameSite': 'none', 'secure': true}).status(200).json({ message: 'Session is not expired', user: response });
//             } else {
//                 return res.status(500).json({ text: 'Could not update session expiration time.' });
//             }
//         } else {
//             return res.status(403).json({ message: 'Session is expired' });
//         }
//     } else {
//         return res.status(500).json({ message: 'There was an error validating the session.'}); 
//     }
// }

// const deleteSession = async (req: Request, res: Response) => {
//     if (!req.cookies.sessionCookie) {
//         return res.status(400).json({ message: "Invalid request: session cookie is required." });
//     }

//     const sessionId = req.cookies.sessionCookie.sessionId;

//     if (!sessionId) {
//         return res.status(400).json({ message: "Invalid request: session ID is required." });
//     }

//     const response = await SessionModel.deleteSession(sessionId);
//     if (response) {
//         return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': '1970-01-01T00:00:00.000Z', 'domain': 'localhost:8085'}).status(200).json({ message: "Session deleted." });
//         // return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': '1970-01-01T00:00:00.000Z', 'domain': DOMAIN}).status(200).json({ message: "Session deleted." });
//     } else {
//         return res.status(500).json({ message: "There was an error with the request." });
//     }
// };

// const createSession = async (req: Request, res: Response) => {
//     const { userId } = req.body;
//     let sessionId = null;

//     if (req.cookies.sessionCookie) {
//         sessionId = req.cookies.sessionCookie.sessionId;
//     } else{
//         sessionId = uuid();
//     }
    
//     if (!userId) {
//         return res.status(400).json({ message: "Invalid request: user ID is required in the request body." });
//     }

//     const response = await SessionModel.createSession(sessionId, userId);
//     if (response) {
//         // return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': response.sessionExpiry, DOMAIN: DOMAIN}, {"sameSite":"none", 'secure': true}).status(200).json({ user: response })
//         return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': response.sessionExpiry, 'domain': 'localhost:8085'}).status(200).json({ user: response })
//     } else {
//         return res.status(500).json({ message: "There was an error with the request." });
//     }
// };

const createSession = async (req: Request, res: Response) => {
    const { userId, idToken, userRole } = req.body;

    if (!userId || !idToken) {
        return res.status(400).json({ 
            success: false,
            message: "Invalid request: both user ID and idToken are required."
        });
    }

    const response = await SessionModel.createSession(idToken, userId,userRole );
    if (response) {
        // return res.status(200).json({ success: true, user: response });
        return res.cookie('sessionCookie', {
            'sessionId': response.sessionId, 
            'expires': response.sessionExpiry,
            'domin': DOMAIN,
            "sameSite":"none",
            'secure' : true})
            .status(200).json({ success: true, user: response });
    } else {
        return res.status(500).json({ success: false, message: "There was an error with the request." });
    }
};


const validateSession = async (req: Request, res: Response) => {
    console.log("Validate Session is being called")
    const sessionToken = req.body.sessionToken;   

    if (sessionToken === undefined || !sessionToken) {

        console.log("no cookie");
        return res.status(400).json({ message: "Invalid request: sessionToken is required." });
    }

    const isValid = await SessionModel.validateSession(sessionToken);
    console.log(isValid);
    if (!isValid) {
        return res.status(403).json({ message: 'Session is invalid or expired' });
    } else {
        return res.status(200).json({ message: 'Session is not expired', user: isValid });


        const updatedSession = await SessionModel.updateSessionExpiry(sessionToken)
        if (updatedSession) {
            return res.status(200).json({ message: 'Session is not expired', user: updatedSession });
        } else {
            return res.status(500).json({ text: 'Could not update session expiration time.' });
        }
    }
};


const deleteSession = async (req: Request, res: Response) => {
    console.log("Delete Session is being called")
    const idToken = req.headers.authorization?.split(' ')[1];
    console.log(idToken)

    if (!idToken) {
        return res.status(400).json({ message: "Invalid request: idToken is required." });
    }

    return res.status(200).json({ success: true, message: "Delete Session is being called" });
};

// const deleteSession = async (req: Request, res: Response) => {
//     if (!req.cookies.sessionCookie) {
//         return res.status(400).json({ message: "Invalid request: session cookie is required." });
//     }

//     const sessionId = req.cookies.sessionCookie.sessionId;

//     if (!sessionId) {
//         return res.status(400).json({ message: "Invalid request: session ID is required." });
//     }

    // const response = await SessionModel.deleteSession(sessionId);
//     if (response) {
//         return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': '1970-01-01T00:00:00.000Z', 'domain': 'localhost:8085'}).status(200).json({ message: "Session deleted." });
//         // return res.cookie('sessionCookie', {'sessionId': sessionId, 'expires': '1970-01-01T00:00:00.000Z', 'domain': DOMAIN}).status(200).json({ message: "Session deleted." });
//     } else {
//         return res.status(500).json({ message: "There was an error with the request." });
//     }
// };




export default module.exports = {
    createSession,
    validateSession,
    deleteSession
};