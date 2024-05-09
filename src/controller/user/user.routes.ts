import express from "express"
import { processRequestBody } from "zod-express-middleware";
import { userRegisterSchema } from "./user.schema";
import { registerUser } from "./user.controller";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register",upload.single("imageFile"),processRequestBody(userRegisterSchema.body),registerUser)

export default router