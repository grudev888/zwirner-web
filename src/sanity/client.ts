import {createClient} from 'next-sanity'
import {useMemo} from 'react'
import {useClient} from 'sanity'

import {apiVersion, dataset, projectId} from './env'

const config = {
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
}

export const client = createClient(config)

export function useSanityClient() {
  const client = useClient(config)
  return useMemo(() => client.withConfig(config), [client])
}
