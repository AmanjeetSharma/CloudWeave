
import { redis } from "./redis.client.js";

export async function checkRedisHealth(): Promise<boolean> {
    try {
        const response = await redis.ping();

        return response === "PONG";
    } catch (error) {
        return false;
    }
}
