
import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is not defined");
}

export const redis = new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,

    retryStrategy(times: number) {
        return Math.min(times * 500, 5000);
    },
});

redis.on("connect", () => {
    console.log("Redis connecting...");
});

redis.on("ready", () => {
    console.log("Redis connection ready");
});

redis.on("error", (error: Error) => {
    console.error("Redis connection error:", error.message);
});

redis.on("close", () => {
    console.log("Redis connection closed");
});


export async function connectRedis(): Promise<void> {
    if (redis.status === "ready") return;

    if (redis.status === "wait") {
        await redis.connect();
    }

    // Verify that Redis is responding.
    const response = await redis.ping();

    if (response !== "PONG") {
        throw new Error("Redis health check failed");
    }
}


export async function disconnectRedis(): Promise<void> {
    if (redis.status === "ready") {
        await redis.quit();
    }
}
