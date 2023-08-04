import {createClient} from 'next-sanity'
import {useMemo} from 'react'

import {apiVersion, dataset, projectId} from './env'

export const config = {
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
}

export const client = createClient(config)

export function useSanityClient() {
  const client = createClient(config)
  return useMemo(() => client.withConfig(config), [client])
}
