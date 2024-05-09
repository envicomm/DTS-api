import express from "express";
import multer from "multer";

import { validateData } from "../../middleware/zodValidation";
import { transactionDetailsSchema } from "./transaction.schema";
import { transactionHandler } from "./transaction.controller";
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.array("files"),
  validateData(transactionDetailsSchema),
  transactionHandler
);

export default router;
