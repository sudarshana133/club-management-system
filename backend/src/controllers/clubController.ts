import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { customReq } from "./middleware";

const prisma = new PrismaClient();

// Add new club
const addClub = async (req: customReq, res: Response) => {
    const { clubName } = req.body;
    const userId = req.userId;
    const role = req.role;
    if (!userId || !role || !clubName) return res.status(403).json({ msg: "Invalid details" });
    if (role === "STUDENT") return res.status(403).json({ msg: "You are not admin to create a club." });
    try {
        await prisma.club.create({
            data: {
                clubName,
                adminId: userId.toString(),
            }
        });
        res.status(200).json({ msg: "Club created successfully" });
    } catch (error: any) {
        res.status(500).json({ msg: "Error" + error.message });
    }
}

export { addClub };
