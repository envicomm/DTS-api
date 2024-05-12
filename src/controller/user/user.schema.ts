import { object, string, TypeOf } from "zod";
import z from "zod";
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
    dateStarted: z.string({
      required_error: "date is required",
    }),
    jobStatus: string({
      required_error: "jobStatus is required",
    }),
    password: string({
      required_error: "password is required",
    }),
    accountType: string({
      required_error: "role is required",
    }),
    contactNumber: string({
      required_error: "contactNumber is required",
    }),
    
  }),
};

export const userLoginSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }),
    password: string({
      required_error: "password is required",
    }),
  }),
}
export const userInfoWithProfile = userRegisterSchema.body.extend({
  imageUrl: z.string(),
});

export const userInfoWithSignedUrl = userRegisterSchema.body.extend({
  imageUrl: z.string(),
  dateStarted: z.date(),
}).omit({
  dateStarted : true,
  password:true,
  accountType: true
});
export type TUserInfoWithProfile = z.infer<typeof userInfoWithProfile>;
export type TUserInfoWithSignedUrl = z.infer<typeof userInfoWithSignedUrl>
export type RegisterBody = TypeOf<typeof userRegisterSchema.body>;
export type TLoginBody = TypeOf<typeof userLoginSchema.body>;