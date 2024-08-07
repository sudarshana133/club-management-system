import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))
const PORT = 8000 || process.env.PORT;
app.use(express.json());
app.use(router);
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
