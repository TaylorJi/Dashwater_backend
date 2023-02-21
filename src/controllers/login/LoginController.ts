import { Request, Response} from "express";
import LoginModel from "../../models/login/LoginModel";


const userLogin = async (req: Request, res: Response) => {
    console.log(req.body);

    const { email, password } = req.body;

    const emailParts = email.split("@"); // Store local part and domain part of the email in an array

    if (!email) {
        res.status(400).json({ message: "Invalid request: Email cannot be blank" });
    } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g)) {
        res.status(400).json({ message: "Email did not match the format: test@example.com" });
    } else if (!(email.length <= 254) && !(emailParts[0] >= 1 && emailParts[0] <= 64) && !(emailParts[1] <= 252)) {
        res.status(400).json({ message: "Enter a valid email" });
    }

    if (!password) {
        res.status(400).json({ message: "Invalid request: Password cannot be blank" });
    } else if (!(password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/g))) {
        res.status(400).json({ message: "Password did not match the format" });
    } else if (!(password.length >= 8 && password.length <= 20)) {
        res.status(400).json({ message: "Password must be between 8 and 20 characters" });
    }

    const response = await LoginModel.loginModel( email, password );

    if (response.message === "Logged in") {
        res.status(200).json({ text: response.message});
    } else if (response.message === "User not found") {
        res.status(400).json({ message: "User does not exist" });
    } else if (response.message === "Invalid password") {
        res.status(400).json({ message: "Password does not match. "});
    } else {
        res.status(500).json({ message: response.message});
    }
};

export default module.exports = {
    userLogin
};