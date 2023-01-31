import { Request, Response } from "express";
import OrdersModel from "../../models/authentication/AuthenticationModel";

const authControllerTest = (req: Request, res: Response) => {

    const { msg } = req.body;

    if (!msg) {
        res.status(400).json({ message: "Invalid request body." });

    } else {

        // casting is for demo, postman sends strings only
        const response = OrdersModel.authModelTest(msg);

        if (response) {
            res.status(200).json({ data: response });

        } else {
            res.status(500).json({ message: 'There was an error with the request.' });
        }
    }

};

export default module.exports = {
    authControllerTest
};