import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken";


export interface customReq extends Request{
    userId?:String,
    role?:UserType
}
export enum UserType {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT"
}
const authMiddleware=(req:customReq,res:Response,next:NextFunction)=>{

    type Data = {
        id:String,
        email:String,
        role:UserType
    }
    const token = req.headers.authorization||"";
    const data = jwt.verify(token,process.env.JWT_SECRET as string) as Data;
    if(!data){
        return res.status(403).json({
            msg:"not authorised"
        })
    }
    req.userId = data.id;
    req.role = data.role;
    next();
}

export default authMiddleware;