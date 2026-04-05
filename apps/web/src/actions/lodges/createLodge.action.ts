import { defineAction } from "astro:actions";
import { getApiBaseUrl } from "../../utils/getApiBaseUrl";

export const createLodge = defineAction({
  accept: "json",
  handler: async (input) => {
    const response = await fetch(new URL("/lodges", getApiBaseUrl()), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data = await response.json();

    if (data.fieldErrors) {
      return { success: false, errors: data.fieldErrors };
    }

    return { success: true, ...data };
  },
});
