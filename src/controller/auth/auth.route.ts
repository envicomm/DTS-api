import express from "express"
import { processRequestBody } from "zod-express-middleware";
import { loginSchema } from "./auth.schema";

const router = express.Router();

router.post("/login",processRequestBody(loginSchema.body),)

router.post("/logout", (req, res) => { 
    res.send("Logout route");
})
export default router