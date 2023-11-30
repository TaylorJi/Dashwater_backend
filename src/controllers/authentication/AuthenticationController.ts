import { NextFunction, Request, Response } from "express";
import SessionModel from "../../models/session/SessionModel";


// It may be possible to combine userAuth and adminAuth into one function, but it would be harder to understand for future teams
// One appraoch would be to pass a flag, isAdmin, from the calling route, which would then be passes from controller to model
const userAuth = async ( req: Request, res: Response, next: NextFunction ) => {
    console.log("userAuth is being called")
    console.log("test------------------- " + req.cookies.sessionCookie)
    // console.log("!!!!!! " + JSON.stringify(req.cookies));
    
    // const isAuth = req.body.isAuthenticated;
    // console.log(isAuth)
    // console.log(req.cookies.sessionCookie)
    if (!req.cookies.sessionCookie) {
        console.log("!!!!!!! " + req.body.sessionCookie);
        if (req.body.sessionCookie) {
            const sessionId = req.body.sessionCookie;
            if (sessionId) {
                const sessionCheck = await SessionModel.validateSession(sessionId); //, isAuth
        
                if (sessionCheck) {
                    next();
                } else {
                    res.status(403).json({ message: "You must be logged in to perform this action." });
                }
            } else {
                res.status(403).json({ message: "You must be logged in to perform this action." });
            }
        }
        res.status(403).json({ message: "No cookie found in request. You must be logged in to perform this action." })
    } else {
        const sessionId = req.cookies.sessionCookie;
        if (sessionId) {
            const sessionCheck = await SessionModel.validateSession(sessionId); //, isAuth
    
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

// const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     console.log("userAuth is being called");

//     const authHeader = req.headers.authorization;
//     const sessionToken = authHeader?.split(' ')[1]; // Bearer TOKEN

//     console.log("Extracted session token:", sessionToken);

//     if (!sessionToken) {
//         res.status(403).json({ message: "No session token found. You must be logged in to perform this action." });
//         return;
//     } 

//     try {
//         const sessionCheck = await SessionModel.validateSession(sessionToken);
//         if (!sessionCheck) {
//             res.status(403).json({ message: "Session is invalid or has expired. You must be logged in to perform this action." });
//             return;
//         }
//         next();
//     } catch (error) {
//         console.error("Session validation error:", error);
//         res.status(500).json({ message: "Internal server error during session validation." });
//     }
// };




// const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
//     if (!req.cookies.sessionCookie) {
//         res.status(403).json({ message: "No cookie found in request. You must be logged in to perform this action." })
//     } else {
//         const sessionId = req.cookies.sessionCookie.sessionId;
//         if (sessionId) {
//             const sessionCheck = await SessionModel.validateSession(sessionId);
    
//             if (sessionCheck) {
//                 next();
//             } else {
//                 res.status(403).json({ message: "You must be logged in and be an admin to perform this action." });
//             }
//         } else {
//             res.status(403).json({ message: "You must be logged in and be an admin to perform this action." });
//         }
//     }
// }

export default module.exports = {
    userAuth,
    // adminAuth
};