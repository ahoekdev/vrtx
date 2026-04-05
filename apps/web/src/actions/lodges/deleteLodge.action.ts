import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { getApiBaseUrl } from "../../utils/getApiBaseUrl";

export const deleteLodge = defineAction({
  accept: "json",
  input: z.object({ id: z.uuid({ version: "v4" }) }),
  handler: async ({ id }) => {
    const response = await fetch(new URL(`/lodges/${id}`, getApiBaseUrl()), {
      method: "DELETE",
    });

    if (response.status === 204) {
      return { success: true };
    }

    if (response.status === 404) {
      throw new ActionError({
        code: "NOT_FOUND",
        message: "Lodge not found.",
      });
    }

    if (response.status === 409) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Lodge still has references.",
      });
    }

    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to delete lodge.",
    });
  },
});
