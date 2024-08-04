import express from "express";
import { addClub } from "../controllers/clubController";
import authMiddleware from "../controllers/middleware";

const clubRouter = express.Router();
clubRouter.use(authMiddleware);
clubRouter.post("/addclub",addClub);
export {clubRouter};