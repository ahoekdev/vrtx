import { defineAction } from "astro:actions";
import { z } from "astro/zod";

const alpineCountryCodes = ["AT", "CH", "DE", "FR", "IT", "LI", "SI"] as const;

const validationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  country: z.enum(alpineCountryCodes),
  keeperId: z.uuid("keeperId must be a UUID"),
});

export const createLodge = defineAction({
  accept: "form",
  input: validationSchema,
  handler: async () => ({ success: true }),
});
