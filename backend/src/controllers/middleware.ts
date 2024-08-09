import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface CustomReq extends Request {
    userId?: string;
    role?: UserType;
}

export enum UserType {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT"
}
type Data = {
    id: string;
    email: string;
    role: UserType;
};

const authMiddleware = (req: CustomReq, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ msg: "Token is required" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as string) as Data;
        req.userId = data.id;
        req.role = data.role;
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(403).json({ msg: "Invalid token" });
    }
};

const adminMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    const {clubId} = req.body;
    if(!clubId){
        return res.status(404).json("clubid missing");
    }
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)return res.json({
        msg:"token required"
    })
    const data = jwt.verify(token,process.env.JWT_SECRET as string) as Data;
    const id = data.id;
    try{
        const user = await prisma.user.findFirst({
            where:{
                uId:id
            }
        })
        if(!user){
            return res.status(404).json({
                msg:"user not found"
            })
        }
        if(user.role == UserType.STUDENT)return res.status(403).json({msg:"you are not an admin"});
        const admin = await prisma.club.findFirst({
            where:{
                uId:clubId
            }
        });
        if(!admin){
            return res.status(404).json({
                msg:"no such club exists"
            })
        }
        const adminId = admin.adminId;
        if(adminId!=id){
            return res.status(403).json({
                msg:"not authorised"
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            msg:err
        })
    }
}

export {authMiddleware,adminMiddleware};
