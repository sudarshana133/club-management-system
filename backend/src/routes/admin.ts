import express from "express";
import authMiddleware from "../controllers/middleware";
import { addMembers,selectCoordinators } from "../controllers/adminController";
const adminRouter = express.Router();
adminRouter.use(authMiddleware);
adminRouter.post('/addCoordinator/:eventId',selectCoordinators)
adminRouter.post("/addmembers/:clubId", addMembers);
export{adminRouter}