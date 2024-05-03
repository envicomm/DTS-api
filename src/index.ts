import dotenv from 'dotenv';
import express from "express";
import authRouter from "./controller/auth/auth.route";
const app = express();


app.use(express.json())


app.use("/api/auth", authRouter)
app.listen(3001, () => {  

    console.log("Server is running on port 3001");
})

