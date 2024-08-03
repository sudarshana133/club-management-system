import express from "express";
import { signin } from "../controllers/userController"
const userRouter = express.Router();
userRouter.get("/signin", signin);
export { userRouter };