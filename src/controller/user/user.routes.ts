import express from "express"
import { processRequestBody } from "zod-express-middleware";
import { userRegisterSchema } from "./user.schema";
import { registerUser } from "./user.controller";

const router = express.Router();

router.post("/register",processRequestBody(userRegisterSchema.body),registerUser)

export default router