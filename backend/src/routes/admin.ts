import express from "express";
import { authMiddleware } from "../controllers/middleware";
import { addMembers,removeMember,searchMembers,selectCoordinators, viewAllMembers, viewMembers,searchUsers } from "../controllers/adminController";
const adminRouter = express.Router();
adminRouter.use(authMiddleware);
adminRouter.get("/viewMembers",viewMembers);
adminRouter.post('/addCoordinator/:eventId',selectCoordinators)
adminRouter.post("/addmembers", addMembers);
adminRouter.put("/deleteMembers",removeMember);
adminRouter.get("/viewAllMembers",viewAllMembers);
adminRouter.post("/searchMembers",searchMembers);
adminRouter.post("/searchUsers",searchUsers);
export{adminRouter}