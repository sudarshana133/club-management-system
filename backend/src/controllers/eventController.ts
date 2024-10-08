import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response } from "express";
import { addEventSchema } from "../zod";
import zod from "zod";
import { CustomReq } from "./middleware";

const prisma = new PrismaClient();

// adding events to a club
const addEvent = async (req: Request, res: Response) => {
    const { title, description, date, venue, fees, clubId, type, memberCount } = req.body;
    const data = {
        title,
        description,
        date,
        venue,
        fees,
        clubId,
        type,
        memberCount
    }
    const success = addEventSchema.safeParse(data);
    if (!success.success) {
        return res.status(400).json({
            msg: "zod error" + success.error
        })
    }

    const newDate = new Date(date);
    try {
        const response = await prisma.event.create({
            data: {
                title,
                description,
                fees,
                clubId,
                date: newDate,
                venue,
                type,
                memberCount,
            }
        })
        return res.status(200).json({
            msg: "event created"
        })
    } catch (err) {
        return res.json({
            msg: "error" + err
        })
    }
}
const getAllEvents = async (req: Request, res: Response) => {
    try {
        const response = await prisma.event.findMany();
        return res.json({ msg: response });
    } catch (err) {
        return res.json({
            msg: err
        })
    }
}

const getSpecificEvent = async (req: CustomReq, res: Response) => {

    const adminId = req.userId;
    var clubId;
    try {
        const response = await prisma.club.findFirst({
            where: {
                adminId
            }
        })
        clubId = response?.uId;
    } catch (err) {
        return res.json({
            msg: err
        })
    }



    try {
        const response = await prisma.event.findMany({
            where: {
                clubId
            },
            include: {
                coordinators: true
            }
        })

        type Coordinator = {
            email: string,
            uId: string
        }

        type details = {
            uId: string,
            title: string,
            description: string,
            date: Date,
            venue: string,
            fees: number | null,
            clubId: string,
            memberCount: number,
            type: string,
            coordinators: Coordinator[] | undefined
        }
        let result: details[] = [];

        for (let i = 0; i < response.length; i++) {
            let emails: Coordinator[] = [];
            for (let j = 0; j < response[i].coordinators.length; j++) {
                const user = await prisma.user.findFirst(
                    {
                        where: {
                            uId: response[i].coordinators[j].coordinatorId
                        }
                    }
                )
                if (user) {
                    emails.push({ email: user.email, uId: user.uId });
                }
            }
            result.push({
                clubId: response[i].clubId,
                title: response[i].title,
                description: response[i].description,
                uId: response[i].uId,
                memberCount: response[i].memberCount,
                type: response[i].type,
                date: response[i].date,
                venue: response[i].venue,
                fees: response[i].fees,
                coordinators: emails,
            });
        }
        return res.status(200).json({
            msg: result
        })
    } catch (err) {
        console.log("hi")
        return res.status(500).json({
            msg: err
        })
    }
}

const getEventOfClub = async (req: CustomReq, res: Response) => {
    const clubId = req.params.clubId;
    const eventId = req.params.eventId;

    type Coordinator = {
        email: string,
        uId: string
    }

    type Details = {
        uId: string,
        title: string,
        description: string,
        date: Date,
        venue: string,
        fees: number | null,
        clubId: string,
        memberCount: number,
        type: string,
        coordinators: Coordinator[] | null
    }

    try {
        const event = await prisma.event.findFirst({
            where: {
                uId: eventId,
                clubId
            },
            include: {
                coordinators: true,
            }
        });

        if (!event) return res.status(404).json({ msg: "Event not found" });

        const coordinators: Coordinator[] = (
            await Promise.all(
                event.coordinators.map(async (coordinator) => {
                    const user = await prisma.user.findFirst({
                        where: { uId: coordinator.coordinatorId },
                        select: { email: true, uId: true }
                    });
                    return user ? { email: user.email, uId: user.uId } : null;
                })
            )
        ).filter((coordinator): coordinator is Coordinator => coordinator !== null);
        const result: Details = {
            uId: event.uId,
            title: event.title,
            description: event.description,
            date: event.date,
            venue: event.venue,
            fees: event.fees,
            clubId: event.clubId,
            memberCount: event.memberCount,
            type: event.type,
            coordinators: coordinators.length > 0 ? coordinators : null
        };
        res.status(200).json({msg:result});
    } catch (error: any) {
        res.status(500).json({ msg: "error" + error.message });
    }
}

const deleteEvent = async (req: CustomReq, res: Response) => {
    const eventId = req.params.eventId;
    if (req.role != UserType.ADMIN) return res.status(403).json({ msg: "You are not admin" });

    try {
        const event = await prisma.event.findFirst({
            where: {
                uId: eventId,
            }
        })
        if (!event) return res.status(404).json({ msg: "Event not found" });
        await prisma.event.delete({
            where: {
                uId: eventId,
            }
        });
        res.status(200).json({ msg: "Event deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ msg: "error" + error.message })
    }
}

const updateEvent = async (req: CustomReq, res: Response) => {
    const eventId = req.params.eventId as string
    const { title, description, date, venue, fees,type,memberCount } = req.body;
    try {
        const check = await prisma.event.findFirst({
            where: {
                uId: eventId
            }
        });
        if (!check) {
            return res.status(404).json({
                msg: "no such event"
            })
        }
        const response = await prisma.event.update({
            where: {
                uId: eventId
            },
            data: {
                title: title || undefined,
                description: description || undefined,
                date: date ? new Date(date) : undefined,
                venue: venue || undefined,
                fees: fees || undefined,
                type: type || undefined,
                memberCount: memberCount || undefined
            }
        })
        return res.status(200).json({
            msg: "event updated"
        })
    } catch (err) {
        return res.status(500).json({
            msg: err
        })
    }
}
const latestEvents = async (req: Request, res: Response) => {
    const response = await prisma.event.findMany(
        {
            where: {
                date: {
                    gt: new Date()
                }
            }
        }
    );
    return res.status(200).json({
        msg: response
    });
}
export { addEvent, getAllEvents, getSpecificEvent, getEventOfClub, deleteEvent, updateEvent, latestEvents };