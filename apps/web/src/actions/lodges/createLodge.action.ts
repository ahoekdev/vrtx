import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { getApiBaseUrl } from "../../utils/getApiBaseUrl";

const alpineCountryCodes = ["AT", "CH", "DE", "FR", "IT", "LI", "SI"] as const;

const validationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  country: z.enum(alpineCountryCodes),
  keeperId: z.uuid("keeperId must be a UUID"),
});

export const createLodge = defineAction({
  accept: "form",
  input: validationSchema,
  handler: async (input) => {
    const response = await fetch(new URL("/lodges", getApiBaseUrl()), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      return { success: true as const };
    }

    const payload = await response.json().catch(() => null);

    return {
      success: false as const,
      message: payload?.message ?? "Unable to create lodge right now.",
      fieldErrors: payload?.fieldErrors ?? {},
    };
  },
});
