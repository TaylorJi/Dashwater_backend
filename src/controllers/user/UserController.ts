import { Request, Response} from "express";

import UserModel from "../../models/user/UserModel";


const createUser = async (req: Request, res: Response) => {

    const { email, password } =  req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Invalid request: email and password are required." });
    } else {
        const response = await UserModel.createUser( email, password );


        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
};


const validateUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Invalid request: email and password are required." });
    } else {
        const response = await UserModel.validateUser( email, password );

        if (response) {
            res.status(200).json({ text: response });
        } else if ( response === false ) {
            res.status(400).json({ message: "User with this email and password combination does not exist." });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }

    }
}

// CRUD test function with MongoDB


export default module.exports = {
    createUser,
    validateUser
};