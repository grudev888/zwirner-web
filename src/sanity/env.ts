import {env} from '@/env.mjs'

const protocol = ['production', 'development', 'preview'].includes(env.NEXT_PUBLIC_VERCEL_ENV)
  ? 'https'
  : 'http'

export const envHost = `${protocol}://${env.NEXT_PUBLIC_VERCEL_URL}`
