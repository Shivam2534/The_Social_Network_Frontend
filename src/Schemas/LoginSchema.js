import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Length must be greater than equal to 4 character" })
    .max(20, { message: "Length must be lesser than equal to 10 character" })
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contains special characters"),
  email: z.string().email({ message: "must be a valid email address" }),
  password: z
    .string()
    .min(4, { message: "password must be greater than 4 character" }),
});
