import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email no es válido",
    }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  name: z.string().min(1),
  lastname: z.string().min(1),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Email no es valido",
    }),
  password: z.string().min(6, {
    message: "La contrasena debe tener al menos 6 caracteres",
  }),
});
