import type { Core } from '@strapi/strapi';
import { invalidateByContentType } from './middlewares/cache';

const CACHED_UIDS = [
  'api::blog.blog',
  'api::global.global',
  'api::home.home',
  'api::about.about',
  'api::member.member',
] as const;

export default {
  register(_ctx: { strapi: Core.Strapi }) {},

  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.DISABLE_REDIS_CACHE === "true" || process.env.NODE_ENV === "development") {
      strapi.log.info('[Cache] Redis cache lifecycle hooks bypassed in development');
      return;
    }

    for (const uid of CACHED_UIDS) {
      strapi.db.lifecycles.subscribe({
        models: [uid],

        async afterCreate()       { await invalidateByContentType(uid); },
        async afterCreateMany()   { await invalidateByContentType(uid); },
        async afterUpdate()       { await invalidateByContentType(uid); },
        async afterUpdateMany()   { await invalidateByContentType(uid); },
        async afterDelete()       { await invalidateByContentType(uid); },
        async afterDeleteMany()   { await invalidateByContentType(uid); },
      });
    }

    strapi.log.info('[Cache] Redis cache lifecycle hooks registered');
  },
};
