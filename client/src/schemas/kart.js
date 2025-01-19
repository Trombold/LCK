import { z } from "zod";

export const kartSchema = z.object({
  category: z.enum(["jr", "x30m", "x30s", "open", "parilla"], {
    errorMap: () => ({ message: "Categoría no válida" }),
  }),
  number: z.number().int().positive(),
  emailUser: z
    .string()
    .email({ message: "Se debe incluir un email válido del usuario" }),
  haveTransponder: z.enum(["yes", "no"], {
    errorMap: () => ({
      message: "Debe seleccionar si tiene transponder propio o no",
    }),
  }),
});
