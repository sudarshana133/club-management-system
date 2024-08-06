import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const selectCoordinators = async (req:Request,res:Response)=>{
    const memberId:string[] = req.body.ids;
    const eventId = req.params.eventId;
    try{
        for(let i=0;i<memberId.length;i++){
            console.log(memberId[i]);
            const response = await prisma.coordinator.create({
                data:{
                    coordinatorId:memberId[i],
                    eventId
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