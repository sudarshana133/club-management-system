import express from "express";
import { addClub,deleteClub } from "../controllers/clubController";
import authMiddleware from "../controllers/middleware";

const clubRouter = express.Router();
clubRouter.use(authMiddleware);
clubRouter.post("/addclub",addClub);
clubRouter.delete("/deleteclub",deleteClub);
export {clubRouter};