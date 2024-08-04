import express from "express";
import dotenv from "dotenv";
import router from "./routes";
dotenv.config();
const app = express();
const PORT = 8000 || process.env.PORT;
app.use(express.json());
app.use(router);
app.listen(PORT,()=>console.log(`app is listening on port ${PORT}`));