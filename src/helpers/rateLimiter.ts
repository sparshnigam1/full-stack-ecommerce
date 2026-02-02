import { redis } from "@/lib/redis";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

export async function rateLimiter(
  key: string,
  limit: number,
  windowInSeconds: number
): Promise<RateLimitResult> {
  const now = Math.floor(Date.now() / 1000); // current second
  const windowKey = `rate-limit:${key}:${Math.floor(now / windowInSeconds)}`;

  const tx = redis.multi();

  tx.incr(windowKey);
  tx.expire(windowKey, windowInSeconds);

  const [count, _] = (await tx.exec()) as [number, unknown];

  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
    reset: (Math.floor(now / windowInSeconds) + 1) * windowInSeconds,
  };
}
