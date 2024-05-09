import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { LoginBody } from "./auth.schema";
import { db } from "../../prisma";
import { signJwt } from "./auth.utils";

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

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };

  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: false,
    domain:  "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,  
  });
  return res.status(StatusCodes.OK).send(jwt);
};

export const logoutHandler = async (req: Request, res: Response) => {
  return res.status(201).send("Logout route");
};
