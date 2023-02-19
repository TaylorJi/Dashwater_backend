import { Request, Response} from "express";
import LoginModel from "../../models/login/LoginModel";


const userLogin = async (req: Request, res: Response) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Invalid request: email and password are required." });
    } else {
        const response = await LoginModel.loginModel( email, password );

        if (response === "No User") {
            res.status(400).json({ message: "User does not exist." });
        } else if (response === "Password Mismatch") {
            res.status(400).json({ message: "Password does not match. "});
        } else {
            res.status(200).json({ text: response});
        }
    }
};

export default module.exports = {
    userLogin
};