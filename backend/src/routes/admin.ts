import express from "express";
import { authMiddleware } from "../controllers/middleware";
import { addMembers,removeMember,selectCoordinators, viewMembers } from "../controllers/adminController";
const adminRouter = express.Router();
adminRouter.use(authMiddleware);
adminRouter.get("/viewMembers",viewMembers);
adminRouter.post('/addCoordinator/:eventId',selectCoordinators)
adminRouter.post("/addmembers", addMembers);
adminRouter.put("/deleteMembers",removeMember);
export{adminRouter}