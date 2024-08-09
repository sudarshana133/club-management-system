import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response } from "express";
import { addEventSchema } from "../zod";
import zod from "zod";
import { CustomReq } from "./middleware";

const prisma = new PrismaClient();

// adding events to a club
const addEvent = async (req: Request, res: Response) => {
    const { title, description, date, venue, fees, clubId } = req.body;
    const data = {
        title,
        description,
        date,
        venue,
        fees,
        clubId
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
                venue
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

    try {
        const response = await prisma.club.findMany({
            where: {
                adminId: req.userId,
            },
            include: {
                events: true
            }
        });
        return res.status(200).json({msg: response})
    } catch (err) {
        return res.status(500).json({
            msg: err
        })
    }
}
const getEventOfClub = async (req: CustomReq, res: Response) => {
    const clubId = req.params.clubId;
    const eventId = req.params.eventId;
    if (req.role != UserType.ADMIN) return res.status(403).json({ msg: "You are not admin" });
    try {
        const event = await prisma.event.findFirst({
            where: {
                uId: eventId,
                clubId
            },
            include: {
                coordinators: true,
            }
        })
        if (!event) return res.status(404).json({ msg: "Event not found" });
        res.status(200).json({ msg: event })
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
    const { title, description, date, venue, fees } = req.body;
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
                fees: fees || undefined
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
    console.log(new Date());
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