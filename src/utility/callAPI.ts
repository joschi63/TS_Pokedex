import { Cache } from "#src/pokecache.js";

export async function callAPI<T>(url: string, type: string, cache: Cache, name?: string) {
    try {
        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
        }

        const obj: T = await resp.json();
        
        cache.add(url, obj);

        return obj;
    } catch (e) {
        throw new Error(`Error fetching ${type} ${name ? `${name}`: ""}: ${(e as Error).message}`,);
    }
}