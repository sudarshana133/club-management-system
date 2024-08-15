import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CustomReq } from "./middleware";

const prisma = new PrismaClient();

const viewMembers = async (req: CustomReq, res: Response) => {
    const adminId = req.userId;
    try {
        const response = await prisma.club.findMany({
            where: {
                adminId,
            },
            include: {
                members: true
            }
        });
        let allMembers: any = [];
        for (let i = 0; i < response.length; i++) {
            allMembers = response[i].members
        }
        const memberDetails = await Promise.all(
            allMembers.map(async (member: any) => {
                return prisma.user.findFirst({
                    where: {
                        uId: member.studentId
                    }
                })
            })
        )
        return res.status(200).json({ msg: memberDetails });
    } catch (err) {
        return res.status(500).json({ msg: "internal server error new" });
    }
}

const viewAllMembers = async (req: CustomReq, res: Response) => {
    try {
        const response = await prisma.user.findMany();
        return res.status(200).json({ msg: response });
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
}

const addMembers = async (req: CustomReq, res: Response) => {
    const uIds: string[] = req.body.uIds;
    const adminId = req.userId;
    let club;
    try {
        club = await prisma.club.findFirst({
            where: {
                adminId
            }
        })
        if (!club) {
            return res.json({
                msg: "not admin"
            })
        }
    } catch (err) {
        return res.json({ msg: err });
    }
    const clubId = club.uId
    if (uIds.length === 0) return res.status(403).json({ msg: "User not present to add as members" });
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
const selectCoordinators = async (req: CustomReq, res: Response) => {
    const memberId: string[] = req.body.ids;
    const eventId = req.params.eventId;
    if (req.role === "STUDENT") return res.status(403).json({ msg: "You are not admin" });
    try {
        for (let i = 0; i < memberId.length; i++) {
            const response = await prisma.coordinator.create({
                data: {
                    coordinatorId: memberId[i],
                    eventId
                }
            })
        }
        return res.status(200).json({
            msg: "added coordinators succesfully"
        })
    } catch (err) {
        return res.status(500).json({
            msg: err
        })
    }
}
// remove members from clubs
const removeMember = async (req: CustomReq, res: Response) => {
    const uIds: string[] = req.body.uIds;
    const adminId = req.userId;
    let club;
    try {
        club = await prisma.club.findFirst({
            where: {
                adminId
            }
        })
        if (!club) {
            return res.json({
                msg: "not admin"
            })
        }
    } catch (err) {
        return res.json({ msg: err });
    }
    const clubId = club.uId
    if (req.role === "STUDENT") return res.status(403).json({ msg: "You are not admin" });
    if (uIds.length === 0) return res.status(403).json({ msg: "There are not members to remove" });
    try {
        const MembersNotPresent: string[] = [];
        for (let i = 0; i < uIds.length; i++) {
            const response = await prisma.member.findFirst({
                where: {
                    studentId: uIds[i],
                    clubId
                }
            });
            if (!response) {
                MembersNotPresent.push(uIds[i]);
                continue;
            }
            await prisma.member.deleteMany({
                where: {
                    studentId: uIds[i],
                    clubId
                }
            })
        }
        res.status(200).json({ msg: "deleted members succesfully", MembersNotPresent });
    } catch (error: any) {
        res.status(500).json({ msg: "error" + error.message });
    }
}
const searchMembers = async (req: Request, res: Response) => {
    const emailName = req.body.emailName;
    if (!emailName) return res.status(200).json({ msg: "No emailName specified." });
    try {
        var members = await prisma.member.findMany({
            where: {
                user: {
                    email: {
                        startsWith: emailName
                    }
                },
            },
            include:{
                user:{
                    select:{
                        email: true,
                        uId:true
                    }
                }
            }
        });
        if (members.length == 0) return res.status(404).json({msg:"User not found"});
        members = members.slice(0,5);
        res.status(200).json({msg:members})
    } catch (error: any) {
        res.status(500).json({ msg: "error: " + error.message });
    }
}
// todo -> problem in this route is as slice is happening so the user who is already a member will also be visible and some users won't be visible
const searchUsers = async (req:Request, res:Response) =>{
    const emailName = req.body.emailName;
    if (!emailName) return res.status(200).json({ msg: "No emailName specified." });
    try {
        var users = await prisma.user.findMany({
            where: {
                email: {
                    startsWith: emailName
                }
            }
        });
        if (users.length == 0) return res.status(404).json({msg:"User not found"});
        users = users.slice(0,5);
        res.status(200).json({msg:users})
    } catch (error: any) {
        res.status(500).json({ msg: "error: " + error.message });
    }
}
export { addMembers, selectCoordinators, removeMember, viewMembers, viewAllMembers,searchMembers,searchUsers }