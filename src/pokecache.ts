type CacheEntry<T> = {
    createdAt: number,
    val: T,
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        const value: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };

        this.#cache.set(key, value);
    }

    get<T>(key: string): CacheEntry<any> | undefined {
        const value = this.#cache.get(key);

        if (!value) {
            return undefined;
        }

        return value;
    }

    #reap() {
        for (const [key, value] of this.#cache.entries()) {
            if (value.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}