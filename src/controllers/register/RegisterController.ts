import { Request, Response} from "express";
import RegisterModel from "../../models/register/RegisterModel";


const userRegister = async (req: Request, res: Response) => {
    // console.log(req);

    const { email, password } =  req.body;

    // console.log(email);
    // console.log(password);

    if (!email || !password) {
        res.status(400).json({ message: "Invalid request: email and password are required." });
    } else {
        const response = await RegisterModel.registerModel( email, password );

        if (response === "User created") {
            res.status(200).json({ text: response});
        } else {
            res.status(400).json({ message: 'Error'});
        }
    }
}

export default module.exports = {
    userRegister
};