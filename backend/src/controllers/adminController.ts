import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

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
const addMembers = async(req: Request, res: Response) => {
    const uIds:String[]  = JSON.parse(req.body);
    const clubId = req.params.clubId;
    try {
        const response = await prisma.club.createMany({
            data: uIds.map(id=>{
                
            })
        })
    } catch (error) {
        
    }
}
export { addMembers }