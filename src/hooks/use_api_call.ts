import { Cache } from "#src/pokecache.js"
import { callAPI } from "#src/utility/callAPI.js";

export async function useAPICall<T>(url: string, type: string, cache: Cache, name?: string): Promise<T> {
    const cached = cache.get<T>(url)

    if (cached) {
        return cached.val as T;
    }

    return await callAPI<T>(url, type, cache, name);
}
