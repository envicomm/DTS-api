import express from "express"
import { processRequestBody } from "zod-express-middleware";
import { loginSchema } from "./auth.schema";
import { loginHander } from "./auth.controller";

const router = express.Router();

router.post("/login",processRequestBody(loginSchema.body),loginHander)

router.post("/logout", (req, res) => { 
    res.send("Logout route");
})
export default router