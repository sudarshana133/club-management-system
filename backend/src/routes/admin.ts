import express from "express";
import { adminMiddleware, authMiddleware } from "../controllers/middleware";
import { addMembers,removeMember,searchMembers,selectCoordinators, viewAllMembers, viewMembers,searchUsers, deleteCoordinators } from "../controllers/adminController";
const adminRouter = express.Router();
adminRouter.use(authMiddleware,adminMiddleware);
adminRouter.get("/viewMembers",viewMembers);
adminRouter.post('/addCoordinator/:eventId',selectCoordinators)
adminRouter.post('/deleteCoordinator/:eventId',deleteCoordinators)
adminRouter.post("/addmembers", addMembers);
adminRouter.put("/deleteMembers",removeMember);
adminRouter.get("/viewAllMembers",viewAllMembers);
adminRouter.post("/searchMembers",searchMembers);
adminRouter.post("/searchUsers",searchUsers);
export{adminRouter}