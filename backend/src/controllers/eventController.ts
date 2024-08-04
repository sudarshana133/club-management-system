import { Request, Response } from "express";

// adding events to a club
const addEvent = async (req: Request, res: Response) => {
    const {title, description,date,venue,fees,} = req.body;
}
export { addEvent };