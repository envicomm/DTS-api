import express from "express"
import { processRequestBody } from "zod-express-middleware";
import { userRegisterSchema } from "./user.schema";
import { getUser, registerUser } from "./user.controller";
import multer from "multer";
import { verifyUser } from "../../middleware/auth/verify_user";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register",upload.single("imageFile"),processRequestBody(userRegisterSchema.body),registerUser)

router.post("/login",registerUser);
router.get("/",getUser);
export default router