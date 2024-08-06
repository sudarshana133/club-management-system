import express from "express";
import authMiddleware from "../controllers/middleware";
import { addMembers } from "../controllers/adminController";
const adminRouter = express.Router();
adminRouter.post("/addmembers?clubId", addMembers);
export { adminRouter }