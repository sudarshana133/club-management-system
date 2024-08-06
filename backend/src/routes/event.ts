import express from "express";
import { addEvent, getAllEvents, getSpecificEvent } from "../controllers/eventController";
import authMiddleware from "../controllers/middleware";

const eventRouter = express.Router();

eventRouter.use(authMiddleware);
eventRouter.post('/addEvent',addEvent);
eventRouter.get('/getAllEvents',getAllEvents);
eventRouter.get('/getEvent/:clubId',getSpecificEvent);
export {eventRouter};