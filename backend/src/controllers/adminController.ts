import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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