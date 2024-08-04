import express from "express";
import { signin, signup } from "../controllers/userController"
const userRouter = express.Router();
userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.post("/event/register", )
export { userRouter };