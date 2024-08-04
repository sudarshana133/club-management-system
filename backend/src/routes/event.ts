import express from "express";
import { addEvent } from "../controllers/eventController";
import authMiddleware from "../controllers/middleware";

const eventRouter = express.Router();

eventRouter.use(authMiddleware);
eventRouter.post('/addEvent',addEvent);
export {eventRouter};