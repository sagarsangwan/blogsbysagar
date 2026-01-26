import { Redis } from '@upstash/redis';

console.log(process.env.KV_REST_API_URL,process.env.KV_REST_API_TOKEN, "/////////////////////lllllllllll" )
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export default redis;

// Rate limiting utility
export async function checkRateLimit(
  key: string,
  limit: number = 5,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const current = await redis.incr(key);
    
    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }

    const remaining = Math.max(0, limit - current);
    return {
      allowed: current <= limit,
      remaining,
    };
  } catch (error) {
    console.warn('[v0] Redis rate limit check failed, allowing request:', error);
    // Graceful degradation - allow request if Redis fails
    return { allowed: true, remaining: limit };
  }
}

// View count deduplication utility
export async function shouldCountView(
  postId: string,
  ip: string
): Promise<boolean> {
  try {
    const key = `view:${postId}:${ip}`;
    const hasViewed = await redis.exists(key);

    if (!hasViewed) {
      // Set 24-hour TTL for this IP-post combination
      await redis.setex(key, 86400, '1');
      return true;
    }

    return false;
  } catch (error) {
    console.warn('[v0] Redis view deduplication failed, counting view:', error);
    // Graceful degradation - count the view if Redis fails
    return true;
  }
}

// Blog list caching utility
export async function getCachedBlogs(key: string) {
  try {
    return await redis.get(key);
  } catch (error) {
    console.warn('[v0] Redis cache retrieval failed:', error);
    return null;
  }
}

export async function setCachedBlogs(
  key: string,
  data: unknown,
  ttlSeconds: number = 60
) {
  try {
    await redis.setex(key, ttlSeconds, JSON.stringify(data));
  } catch (error) {
    console.warn('[v0] Redis cache set failed:', error);
  }
}
