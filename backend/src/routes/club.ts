import express from "express";
import {
  addClub,
  deleteClub,
  getClub,
  getClubs,
} from "../controllers/clubController";
import { authMiddleware, adminMiddleware } from "../controllers/middleware";

const clubRouter = express.Router();
clubRouter.use(authMiddleware);
clubRouter.post("/addclub",addClub);
clubRouter.delete("/deleteclub", adminMiddleware, deleteClub);
clubRouter.get("/clubs", getClubs);
clubRouter.get("/clubs/:clubId", getClub);
export { clubRouter };
