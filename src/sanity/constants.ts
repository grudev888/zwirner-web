// This is the document id used for the preview secret that's stored in your dataset.

import {env} from '@/env.mjs'

/**
 * Limits the number of returned documents when the query is executed if
 * the env variable `NEXT_PUBLIC_PARTIAL_BUILD` is set to `true`.
 *
 * Useful for quicker builds during development.
 */
export const DEV_GROQ_BUILD_LIMIT = env.NEXT_PUBLIC_PARTIAL_BUILD ? '[0..100]' : ''
