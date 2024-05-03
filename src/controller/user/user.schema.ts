import { object, string, TypeOf } from "zod";

export const userRegisterSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }),
    firstName: string({
      required_error: "firstName is required",
    }).min(2, "firstName must be at least 6 characters"),
    lastName: string({
      required_error: "lastName is required",
    }).min(2, "lastName must be at least 6 characters"),
    assignedDivision: string({
      required_error: "assignedDivision is required",
    }),
    assignedPosition: string({
        required_error: "assignedPosition is required",
      }),
    assignedSection: string({
      required_error: "assignedSection is required",
    }),
    dateStarted: string({
      required_error: "date is required",
    }).datetime(),
    jobStatus: string({
      required_error: "jobStatus is required",
    }),
    username: string({
      required_error: "username is required",
    }),
    password: string({
      required_error: "password is required",
    }),
    role: string({
        required_error: "role is required",
      }),
  }),
};

export type RegisterBody = TypeOf<typeof userRegisterSchema.body>;
