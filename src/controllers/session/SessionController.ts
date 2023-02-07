import { Request, Response } from "express";
import SessionModel from "../../models/session/SessionModel";

const sessionControllerTest = (req: Request, res: Response) => {
    const { msg } = req.body;

    if (!msg) {
        res.status(400).json({ message: "Invalid request. "});
    } else {
        const response = SessionModel.sessionModelTest(msg);

        if (response) {
            res.status(200).json({ text: response });
        } else {
            res.status(500).json({ message: "There was an error with the request." });
        }
    }
};

export default module.exports = {
    sessionControllerTest
};