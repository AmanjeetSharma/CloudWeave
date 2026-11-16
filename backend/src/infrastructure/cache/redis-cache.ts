
import { redis } from "../redis/redis.client.js";
import type { CacheInterface } from "./cache.interface.js";

export class RedisCache implements CacheInterface {
    async get<T>(key: string): Promise<T | null> {
        const value = await redis.get(key);

        if (value === null) {
            return null;
        }

        return JSON.parse(value) as T;
    }

    async set<T>(
        key: string,
        value: T,
        ttlSeconds?: number,
    ): Promise<void> {
        const serializedValue = JSON.stringify(value);

        if (ttlSeconds !== undefined) {
            await redis.set(key, serializedValue, "EX", ttlSeconds);
            return;
        }

        await redis.set(key, serializedValue);
    }

    async delete(key: string): Promise<void> {
        await redis.del(key);
    }

    async exists(key: string): Promise<boolean> {
        return (await redis.exists(key)) === 1;
    }
}
