import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const selectCoordinators = async (req:Request,res:Response)=>{
    const memberId:string[] = JSON.parse(req.body.ids);
    const eventId = req.params.eventId;
    const clubId = req.params.clubId;
    try{
        for(let i=0;i<memberId.length;i++){
            const response = prisma.member.create({
                data:{
                    clubId,
                    coordinatorId:eventId,
                    studentId:memberId[i]
                }
            })
        }
        return res.json({
            msg:"added coordinators succesfully"
        })
    }catch(err){
        return res.json({
            msg:err
        })
    }
  }
export {selectCoordinators}