
const REDIS_PREFIX = "cloudweave";

export const redisKeys = {
    // Authentication
    auth: {
        session: (sessionId: string) =>
            `${REDIS_PREFIX}:auth:session:${sessionId}`,

        userSessions: (userId: string) =>
            `${REDIS_PREFIX}:auth:user-sessions:${userId}`,

        refreshToken: (tokenHash: string) =>
            `${REDIS_PREFIX}:auth:refresh:${tokenHash}`,

        tokenFamily: (familyId: string) =>
            `${REDIS_PREFIX}:auth:token-family:${familyId}`,
    },

    // Security
    security: {
        loginAttempts: (identifier: string) =>
            `${REDIS_PREFIX}:security:login-attempts:${identifier}`,

        rateLimit: (identifier: string) =>
            `${REDIS_PREFIX}:security:rate-limit:${identifier}`,
    },
} as const;

