import type { User } from "../types/User";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";

export async function getKeepers() {
  try {
    const res = await fetch(new URL("/users", getApiBaseUrl()));

    if (!res.ok) {
      return { data: [], error: true };
    } else {
      const data = (await res.json()) as User[];
      return { data, error: false };
    }
  } catch {
    return { data: [], error: true };
  }
}
