import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { LoginBody } from "./auth.schema";
import { db } from "../../prisma";
import { signJwt } from "./auth.utils";
import { checkUserExists } from "./auth.service";
import jwt from "jsonwebtoken";
export const loginHander = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
 
  const { ...rest } = req.body

  try {

    const user = await checkUserExists(rest.email);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).send("User not found");
    }
    if(user.password !== rest.password){
      return res.status(StatusCodes.UNAUTHORIZED).send("Incorrect password");
    }

    const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 300000, secure: true, sameSite: 'strict' });
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 300000, secure: true, sameSite: 'strict' });

    res.status(StatusCodes.OK).send("User logged in successfully");
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong while logging in");
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  return res.status(201).send("Logout route");
};
