import {env} from '@/env.mjs'

export const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-01-01'

export const envHost = `http${
  ['production', 'development', 'preview'].includes(process.env.NEXT_PUBLIC_VERCEL_ENV || '')
    ? 's'
    : ''
}://${env.NEXT_PUBLIC_VERCEL_URL}`

export const dataset = assertValue(
  env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
