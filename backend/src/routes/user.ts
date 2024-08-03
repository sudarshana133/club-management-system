import express from "express";
import { signin } from "../controllers/userController"
const userRouter = express.Router();
userRouter.post("/signin", signin);
export { userRouter };