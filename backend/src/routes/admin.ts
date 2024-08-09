import express from "express";
import { authMiddleware } from "../controllers/middleware";
import { addMembers,removeMember,selectCoordinators } from "../controllers/adminController";
const adminRouter = express.Router();
adminRouter.use(authMiddleware);
adminRouter.post('/addCoordinator/:eventId',selectCoordinators)
adminRouter.post("/addmembers/:clubId", addMembers);
adminRouter.delete("/deleteMembers/:clubId",removeMember);
export{adminRouter}