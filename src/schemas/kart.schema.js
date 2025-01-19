import { z } from "zod";

export const kartSchema = z.object({
  category: z.string({ required_error: "Este campo es obligatorio" }),
  number: z.number({ required_error: "El número del kart es obligatorio" }),
  description: z.string(),
});
