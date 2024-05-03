import { StatusCodes } from "http-status-codes";
import express, { Request, Response } from "express";
import { LoginBody } from "./auth.schema";
import { db } from "../../prisma";

export const loginHander = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  const { username, password } = req.body;

  const user = await db.userAccounts.findFirst({
    where: {
      username,
    },
  });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).send("User not found");
  }

  if (user.password !== password) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Invalid password");
  }
  return res.status(StatusCodes.OK).send("Login successful");
};

export const logoutHandler = async (req: Request, res: Response) => {
  return res.status(201).send("Logout route");
};
