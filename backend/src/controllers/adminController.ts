import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomReq } from "./middleware";

const prisma = new PrismaClient();

const addMembers = async (req: CustomReq, res: Response) => {
    const uIds: string[] = req.body.uIds;
    const clubId = req.params.clubId;
    if (uIds.length == 0) return res.status(403).json({ msg: "User not present to add as members" });
    if (req.role === "STUDENT") return res.status(403).json({ msg: "You are not admin" });
    try {
        for (let i = 0; i < uIds.length; i++) {
            const response = await prisma.member.findFirst({
                where: {
                    studentId: uIds[i]
                }
            })
            if (response) continue;
            await prisma.member.create({
                data: {
                    studentId: uIds[i],
                    clubId: clubId,
                }
            })
        }
        res.status(200).json({ msg: "Added members successfully" });
    } catch (error: any) {
        res.status(500).json({ msg: "Error" + error.message });
    }
}
const selectCoordinators = async (req: Request, res: Response) => {
    const memberId: string[] = req.body.ids;
    const eventId = req.params.eventId;
    try {
        for (let i = 0; i < memberId.length; i++) {
            console.log(memberId[i]);
            const response = await prisma.coordinator.create({
                data: {
                    coordinatorId: memberId[i],
                    eventId
                }
            })
        }
        return res.json({
            msg: "added coordinators succesfully"
        })
    } catch (err) {
        return res.json({
            msg: err
        })
    }
}
export { addMembers, selectCoordinators }