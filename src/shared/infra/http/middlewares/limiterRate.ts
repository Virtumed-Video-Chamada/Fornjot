import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import AppError from '@shared/errors/App.Error';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const url = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = redis.createClient({
    url,
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimit',
    points: 5,
    duration: 1,
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await limiter.consume(request.ip);
        return next();
    } catch (err) {
        throw new AppError('To Many requests', 429);
    }
}
