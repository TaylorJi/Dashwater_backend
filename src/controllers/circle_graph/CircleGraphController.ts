import { Request, Response } from "express";
import CircleGraphModel from "../../models/circle_graph/CircleGraphModel";

const testRoute = async (req: Request, res: Response) => {
    console.log(req)
    CircleGraphModel.testRoute()
    return res.status(200).json({ message: "Success." });
};

export default module.exports = {
    testRoute
};