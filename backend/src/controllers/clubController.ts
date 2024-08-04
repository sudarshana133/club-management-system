import { Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// add new club
const addClub = async (req: Request, res: Response) => {
    const { clubName } = req.body;
    try {
        const response = await prisma.club.create({ data: { clubName } });
    } catch (error) {

    }
}
export { addClub }