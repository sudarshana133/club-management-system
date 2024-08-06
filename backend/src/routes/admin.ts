import express from "express";
import authMiddleware from "../controllers/middleware";
import { selectCoordinators } from "../controllers/adminController";
const adminRouter = express.Router();
adminRouter.use(authMiddleware);
adminRouter.post('/addCoordinator/:eventId',selectCoordinators)
export{adminRouter}