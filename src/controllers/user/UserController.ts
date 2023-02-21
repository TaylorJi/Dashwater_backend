import { Request, Response} from "express";

import UserModel from "../../models/user/UserModel";


const createNewUser = async (req: Request, res: Response) => {

    const { email, password } =  req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Invalid request: email and password are required." });
    } else {
        const response = await UserModel.createNewUser( email, password );

        if (response.message === "User created") {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: response.message });
        }
    }
}

export default module.exports = {
    createNewUser
};