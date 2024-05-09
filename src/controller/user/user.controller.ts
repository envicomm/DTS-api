import { Request, Response } from "express";
import { RegisterBody } from "./user.schema";
import { db } from "../../prisma";
import { Roles } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { uploadImageToS3, uploadToS3 } from "../../services/aws-config";
import { insertUserInfo } from "./user.service";

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
) => {
  const data = req.body;
  const file = req.file;
  if (!file) {
    return res.status(StatusCodes.BAD_REQUEST).send("No image uploaded");
  }

  try {
    const imageUrl = await uploadImageToS3(file);

    if (!imageUrl) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error uploading image");
    }
    await insertUserInfo({ ...data, imageUrl });

    return res.status(StatusCodes.CREATED).send("User created successfully");
  } catch (error) {
    console.log(error);
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error creating user");
  }
};
