import { Request, Response } from "express";

const initialize = (req: Request, res: Response) => {
    console.log("TESTING!");
    console.log(req);
    console.log(res);

    res.status(200).json({message: "Hello"});
}

export default module.exports = {
    initialize
};