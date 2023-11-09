// This is the document id used for the preview secret that's stored in your dataset.

import {env} from '@/env.mjs'

// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId: `${string}.${string}` = 'preview.secret'

// Amount of elements returned when generating paths when building pages
// Run full build for production envs that use the production dataset
export const DEV_GROQ_BUILD_LIMIT =
  env.NEXT_PUBLIC_VERCEL_ENV === 'production' && env.NEXT_PUBLIC_SANITY_DATASET === 'production-v1'
    ? ''
    : '[0..100]'
