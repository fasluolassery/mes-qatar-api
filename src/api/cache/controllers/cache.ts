import { clearAllCache, clearCacheByPath } from "../../../middlewares/cache";

export default {
  async clear(ctx: any) {
    const token = ctx.request.headers["x-cache-token"];
    const expectedToken = process.env.CACHE_BYPASS_TOKEN;

    if (!expectedToken || token !== expectedToken) {
      return ctx.forbidden("Invalid or missing cache token");
    }

    const { all, path } = ctx.request.body || {};

    if (all === true) {
      const count = await clearAllCache();
      return ctx.send({
        success: true,
        message: `Redis cache completely cleared. Total keys invalidated: ${count}`,
        invalidatedKeys: count,
      });
    }

    if (typeof path === "string" && path.trim() !== "") {
      const count = await clearCacheByPath(path.trim());
      return ctx.send({
        success: true,
        message: `Redis cache cleared for path prefix: ${path}. Total keys invalidated: ${count}`,
        invalidatedKeys: count,
      });
    }

    return ctx.badRequest(
      'Invalid payload. Please provide either { "all": true } or a specific { "path": "/your-path" }'
    );
  },
};
