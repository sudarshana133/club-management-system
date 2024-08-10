import express from "express";
import { eventRegistration, signin, signup,getClubId } from "../controllers/userController"
import { authMiddleware } from "../controllers/middleware";
const userRouter = express.Router();
userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.use(authMiddleware);
userRouter.post("/event/register", eventRegistration);
userRouter.post("/getClubId",getClubId);
export { userRouter };