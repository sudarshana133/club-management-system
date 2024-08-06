import express from "express";
import authMiddleware from "../controllers/middleware";
import { selectCoordinators } from "../controllers/adminController";
const adminRouter = express.Router();
adminRouter.post('/addCoordinator/:clubId/:eventId/:ids')
export{adminRouter}