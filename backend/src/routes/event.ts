import express from "express";
import { addEvent, getAllEvents, getEventOfClub, getSpecificEvent,deleteEvent } from "../controllers/eventController";
import { authMiddleware,eventMiddleware } from "../controllers/middleware";

const eventRouter = express.Router();

eventRouter.use(authMiddleware);
eventRouter.post('/addEvent',eventMiddleware,addEvent);
eventRouter.get('/getAllEvents',getAllEvents);
eventRouter.get("/getEvent/:clubId/:eventId",getEventOfClub);
eventRouter.get('/getEvent/:clubId',getSpecificEvent);
eventRouter.delete("/deleteEvent/:eventId",eventMiddleware,deleteEvent);
export {eventRouter};