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
const deleteClub = async (req: customReq, res: Response) => {
    const { clubName } = req.body;
    const userId = req.userId;
    const role = req.role;
    if (!clubName || !userId || !role) return res.status(403).json({ msg: "Missing details" });
    try {
        await prisma.club.delete({
            where: {
                clubName,
            }
        });
        res.status(200).json({ msg: "Deleted club successfully" });
    } catch (error: any) {
        res.status(500).json({ msg: "Error" + error.message });
    }
};
const getClubs = async (req: Request, res: Response) => {
    try {
        const clubs = await prisma.club.findMany();
        if (clubs.length > 0) {
            return res.status(200).json({ msg: clubs });
        }
        res.status(404).json({ msg: "Clubs not found" });
    } catch (error: any) {
        res.status(500).json({ msg: "Error" + error.message });
    }
}
const getClub = async(req: Request, res: Response) => {
    const clubId = req.params.clubId;
    try {
        const club = await prisma.club.findFirst({
            where:{
                uId:clubId
            }
        })
        if(!club) return res.status(404).json({ msg: "Club not found" });
        res.status(200).json({ msg: club});
    } catch (error:any) {
        res.status(500).json({ msg: "Error" + error.message });
    }
};
export { addClub, deleteClub, getClubs,getClub };