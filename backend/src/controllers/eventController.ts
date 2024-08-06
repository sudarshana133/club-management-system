import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { addEventSchema } from "../zod";
import zod from "zod";

const prisma  = new PrismaClient();

// adding events to a club
const addEvent = async (req: Request, res: Response) => {
    const {title,description,date,venue,fees,clubId} = req.body;
    const data = {
        title,
        description,
        date,
        venue,
        fees,
        clubId
    }
    const success = addEventSchema.safeParse(data);
    if(!success.success){
        return res.status(400).json({
            msg:"zod error"+success.error
        })
    }
        
    const newDate = new Date(date);
    try{
        const response =await prisma.event.create({
            data:{
                title,
                description,
                fees,
                clubId,
                date:newDate,
                venue
            }
        })
        return res.status(200).json({
            msg:"event created"
        })
    }catch(err){
        return res.json({
            msg:"error"+err
        })
    }
}
const getAllEvents = async (req:Request,res:Response)=>{
    try{
        const response = await prisma.event.findMany();
        return res.json({msg:response});
    }catch(err){
        return res.json({
            msg:err
        })
    }
}

const getSpecificEvent = async (req:Request,res:Response)=>{
    const clubId = req.params.clubId;
    try{
        const response = await prisma.event.findMany({
            where:{
                clubId
            }
        })
        return res.status(200).json({
            msg:response,
            second:req.params.second
        })
    }catch(err){
        return res.status(500).json({
            msg:err
        })
    }
}
export { addEvent,getAllEvents,getSpecificEvent };