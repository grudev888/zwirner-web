import {createClient} from 'next-sanity'
import {useMemo} from 'react'

import {env} from '@/env.mjs'

export const config = {
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
}

export const client = createClient(config)

export function useSanityClient() {
  const client = createClient(config)
  return useMemo(() => client.withConfig(config), [client])
}
