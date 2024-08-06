import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomReq extends Request {
    userId?: string;
    role?: UserType;
}

export enum UserType {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT"
}

const authMiddleware = (req: CustomReq, res: Response, next: NextFunction) => {
    type Data = {
        id: string;
        email: string;
        role: UserType;
    };

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

export default authMiddleware;
