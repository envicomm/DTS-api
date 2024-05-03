import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "password is required",
    })
      .min(6, "password must be at least 6 characters")
      .max(64, "password must not be longer than 64 charcters"),
  }),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;