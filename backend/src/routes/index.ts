import express from "express"
import { userRouter } from "./user";
import { clubRouter } from "./club";
import { eventRouter } from "./event";
const router = express.Router();

router.use('/user',userRouter);
router.use('/club',clubRouter);
router.use('/event',eventRouter);

export default router;