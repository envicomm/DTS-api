import { Roles } from "@prisma/client";
import { db } from "../../prisma";
import { TLoginBody, TUserInfoWithProfile } from "./user.schema";


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
      password,
      accountType,
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
            email,
            password,
            accountType: accountType as Roles,
          },
        },
      },
    });

  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong while creating user - service!")
  }
};
