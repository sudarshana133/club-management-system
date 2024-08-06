import express from "express"
import { userRouter } from "./user";
import { clubRouter } from "./club";
import { eventRouter } from "./event";
import { adminRouter } from "./admin";
const router = express.Router();

router.use('/user',userRouter);
router.use('/club',clubRouter);
router.use('/event',eventRouter);
router.use('/admin',adminRouter);

export default router;