import { Request, Response } from "express";
import { RegisterBody } from "./user.schema";
import { db } from "../../prisma";
import { Roles } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
) => {
  const {
    email,
    firstName,
    lastName,
    assignedDivision,
    assignedSection,
    assignedPosition,
    dateStarted,
    jobStatus,
    username,
    password,
    role,
  } = req.body;

  try {
    await db.userInfo.create({
      data: {
        email,
        firstName,
        lastName,
        assignedPosition,
        assignedDivision,
        assignedSection,
        dateStarted,
        jobStatus,
        account: {
          create: {
            username,
            password,
            role: role as Roles,
          },
        },
      },
    });
    return res.status(StatusCodes.CREATED).send("User created successfully");
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error creating user");
  }
};
