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
};


const getUser = async (_req: Request, res: Response) => {
    const response = await UserModel.getUser();

    if (response) {
        res.status(200).json({ data: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
};


const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.getSingleUser(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found"});
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({message: "Internal server error"});
    }
};


const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const userEmail = req.body.email
        const userPassword = req.body.password
        const userRole = req.body.role
        const user = await UserModel.updateUser(userId, userEmail ,userPassword, userRole);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found"});
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({message: "Internal server error"});
    }
};


const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const response = await UserModel.deleteUser(userId);

    if (response) {
        res.status(200).json({ data: response });
    } else {
        res.status(500).json({ message: "There was an error with the request." });
    }
};

export default module.exports = {
    createUser,
    validateUser,
    getUser, 
    getSingleUser,
    updateUser,
    deleteUser
};