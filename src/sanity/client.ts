import type {ClientConfig} from 'next-sanity'
import {type SanityClient, createClient} from 'next-sanity'

import {env} from '@/env.mjs'

export const readToken = process.env.SANITY_API_READ_TOKEN

export const config: ClientConfig = {
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  perspective: 'published',
  resultSourceMap: true,
}

export const client = createClient(config)

export function getClient(preview?: {token: string | undefined}): SanityClient {
  const client = createClient(config)
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}
