import { Roles } from "@prisma/client";
import { db } from "../../prisma";
import { TUserInfoWithProfile } from "./user.schema";


export const insertUserInfo = async (data: TUserInfoWithProfile) => {
  try {
    const {
      email,
      firstName,
      lastName,
      assignedDivision,
      assignedPosition,
      assignedSection,
      dateStarted,
      jobStatus,
      username,
      password,
      role,
      contactNumber,
      imageUrl,
    } = data;

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
        contactNumber,
        imageUrl,
        account: {
          create: {
            username,
            password,
            role: role as Roles,
          },
        },
      },
    });
  
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong while creating user - service!")
  }
};
