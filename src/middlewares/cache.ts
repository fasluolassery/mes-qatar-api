import { Redis } from "@upstash/redis";

const CACHE_TTL = parseInt(process.env.CACHE_TTL || "86400", 10);
const CACHE_PREFIX = "strapi:cache:";

// Maps content type UIDs to the URL prefix they affect
const CONTENT_TYPE_URL_MAP: Record<string, string> = {
  "api::event.event": "/api/events",
  "api::blog.blog": "/api/blogs",
  "api::global.global": "/api/global",
  "api::home.home": "/api/home",
  "api::about.about": "/api/about",
  "api::member.member": "/api/members",
};

let _redis: Redis | null = null;

function getClient(): Redis | null {
  if (process.env.DISABLE_REDIS_CACHE === "true" || process.env.NODE_ENV === "development") {
    return null;
  }
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  if (!_redis) {
    _redis = new Redis({ url, token });
  }
  return _redis;
}

/**
 * Deletes all cached entries whose keys start with the given URL prefix.
 * Called from lifecycle hooks in src/index.ts.
 */
export async function invalidateByContentType(uid: string): Promise<void> {
  const urlPrefix = CONTENT_TYPE_URL_MAP[uid];
  if (!urlPrefix) return;

  const client = getClient();
  if (!client) return;

  try {
    const pattern = `${CACHE_PREFIX}${urlPrefix}*`;
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(...(keys as [string, ...string[]]));
      strapi.log.debug(`[Cache] Invalidated ${keys.length} key(s) for ${uid}`);
    }
  } catch (err) {
    strapi.log.error(`[Cache] Invalidation error for ${uid}: ${err}`);
  }
}

/**
 * Manually clears all cached items starting with CACHE_PREFIX.
 */
export async function clearAllCache(): Promise<number> {
  const client = getClient();
  if (!client) return 0;

  try {
    const pattern = `${CACHE_PREFIX}*`;
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(...(keys as [string, ...string[]]));
      return keys.length;
    }
  } catch (err) {
    strapi.log.error(`[Cache] Clear all error: ${err}`);
  }
  return 0;
}

/**
 * Manually clears cached items starting with a specific path.
 */
export async function clearCacheByPath(path: string): Promise<number> {
  const client = getClient();
  if (!client) return 0;

  try {
    const cleanPath = path.startsWith('/api') ? path : `/api${path}`;
    const pattern = `${CACHE_PREFIX}${cleanPath}*`;
    const keys = await client.keys(pattern);
    if (keys.length > 0) {
      await client.del(...(keys as [string, ...string[]]));
      return keys.length;
    }
  } catch (err) {
    strapi.log.error(`[Cache] Clear path error for ${path}: ${err}`);
  }
  return 0;
}

/**
 * Strapi middleware factory.
 * Caches GET /api/* responses in Upstash Redis.
 */
export default (_config: unknown, _ctx: unknown) => {
  return async (ctx: any, next: () => Promise<void>) => {
    // Only cache public API reads — exclude /api/events entirely since
    // upcoming/completed queries embed a live timestamp in the URL, making
    // every request a unique cache key that is never reused (Redis bloat).
    // Next.js ISR (60s) already caches event data on the frontend side.
    if (
      ctx.method !== "GET" ||
      !ctx.path.startsWith("/api/") ||
      ctx.path.startsWith("/api/events")
    ) {
      return next();
    }

    const client = getClient();
    if (!client) {
      return next();
    }

    const key = `${CACHE_PREFIX}${ctx.url}`;

    // --- Cache read ---
    try {
      const cached = await client.get<unknown>(key);
      if (cached !== null) {
        ctx.status = 200;
        ctx.body = cached;
        ctx.set("X-Cache", "HIT");
        return;
      }
    } catch (err) {
      strapi.log.warn(`[Cache] Read error, bypassing cache: ${err}`);
      return next();
    }

    await next();

    // --- Cache write ---
    if (ctx.status === 200 && ctx.body != null) {
      try {
        await client.set(key, ctx.body, { ex: CACHE_TTL });
        ctx.set("X-Cache", "MISS");
      } catch (err) {
        strapi.log.warn(`[Cache] Write error: ${err}`);
      }
    }
  };
};
