import dotenv from "dotenv";
import express from "express";
import authRouter from "./controller/auth/auth.route";
import userRouter from "./controller/user/user.routes";
import transactionRouter from "./controller/transaction/transaction.route";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors({
  origin : '*'
}))
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
