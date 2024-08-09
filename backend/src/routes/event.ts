import express from "express";
import {
  addEvent,
  getAllEvents,
  getEventOfClub,
  getSpecificEvent,
  deleteEvent,
  updateEvent,
  latestEvents,
} from "../controllers/eventController";
import { authMiddleware, adminMiddleware } from "../controllers/middleware";

const eventRouter = express.Router();

eventRouter.use(authMiddleware);
eventRouter.post("/addEvent", adminMiddleware, addEvent);
eventRouter.get("/getAllEvents", getAllEvents);
eventRouter.get("/getEvent/:clubId/:eventId", getEventOfClub);
eventRouter.get("/getEvent", getSpecificEvent);
eventRouter.delete("/deleteEvent/:eventId", adminMiddleware, deleteEvent);
eventRouter.put("/updateEvent/:eventId",adminMiddleware,updateEvent);
eventRouter.get("/latestEvents",latestEvents);
export { eventRouter };
