import type { Lodge } from "../types/Lodge";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";

export async function getLodges() {
  console.log(getApiBaseUrl());
  try {
    const res = await fetch(new URL("/lodges", getApiBaseUrl()));

    if (!res.ok) {
      return { data: [], error: true };
    } else {
      const data = (await res.json()) as Lodge[];
      return { data, error: false };
    }
  } catch {
    return { data: [], error: true };
  }
}
