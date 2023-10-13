import {createEnv} from '@t3-oss/env-nextjs'
import {z} from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    SANITY_API_READ_TOKEN: z.string().min(1),
    ANALYZE: z
      .string()
      // only allow "true" or "false"
      .refine((s) => s === 'true' || s === 'false')
      // transform to boolean
      .transform((s) => s === 'true'),
    ISR_TOKEN: z.string().nullish(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_VERCEL_GIT_PROVIDER: z.literal('github'),
    NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER: z.literal('Zwirner'),
    NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: z.literal('web'),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.enum(['test', 'sandbox', 'production-v1', 'dev', 'migration']),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),
    NEXT_PUBLIC_VERCEL_URL: z.string().min(1),
    NEXT_PUBLIC_VERCEL_ENV: z.enum(['production', 'preview', 'development', 'local']),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().min(1),
    NEXT_PUBLIC_FORMS_API: z.string().url(),
    NEXT_PUBLIC_GTM_ID: z.string().min(1),
    NEXT_PUBLIC_INQUIRY_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_SUBSCRIBE_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_SUBSCRIBE_TOPIC_NEWS_ID: z.string(),
    NEXT_PUBLIC_SUBSCRIBE_TOPIC_SALES_ID: z.string(),
    NEXT_PUBLIC_SUBSCRIBE_TOPIC_BOOKS_ID: z.string(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_VERCEL_GIT_PROVIDER: process.env.NEXT_PUBLIC_VERCEL_GIT_PROVIDER,
    NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER,
    NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_FORMS_API: process.env.NEXT_PUBLIC_FORMS_API,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    ANALYZE: process.env.ANALYZE,
    ISR_TOKEN: process.env.ISR_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    NEXT_PUBLIC_INQUIRY_ENDPOINT: process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT,
    NEXT_PUBLIC_SUBSCRIBE_ENDPOINT: process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT,
    NEXT_PUBLIC_SUBSCRIBE_TOPIC_NEWS_ID: process.env.NEXT_PUBLIC_SUBSCRIBE_TOPIC_NEWS_ID,
    NEXT_PUBLIC_SUBSCRIBE_TOPIC_SALES_ID: process.env.NEXT_PUBLIC_SUBSCRIBE_TOPIC_SALES_ID,
    NEXT_PUBLIC_SUBSCRIBE_TOPIC_BOOKS_ID: process.env.NEXT_PUBLIC_SUBSCRIBE_TOPIC_BOOKS_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_CHECK,
})
