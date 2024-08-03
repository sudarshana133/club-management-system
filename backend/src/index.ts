import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 8000 || process.env.PORT;
app.get("/", (req, res) =>{
    res.send("Hi there");
})
app.listen(PORT,()=>console.log(`app is listening on port ${PORT}`));