import { z } from "zod";

export const confirmPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Please enter your password")
    .max(50, "Password is wrong")
});

export type ConfirmPasswordSchema = z.infer<typeof confirmPasswordSchema>;

export const changeEmailSchema = z.object({
  email: z
    .string({
      required_error: "Please enter your new email address"
    })
    .email()
    .max(50, "Seems to be not a valid email address")
});

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
