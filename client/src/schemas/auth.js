import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(3, {
        message: "Name must be at least 3 characters",
      }),
    lastname: z
      .string({
        required_error: "Lastname is required",
      })
      .min(3, {
        message: "Lastname must be at least 3 characters",
      }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    repeatPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
