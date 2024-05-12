import { db } from "../../prisma";

export const checkUserExists = async (email: string) => {

    const user = await db.userAccounts.findFirst({
      where: {
        email
      }
    })
    return user;
  }