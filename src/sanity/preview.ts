import {definePreview} from 'next-sanity/preview'

import {env} from '@/env.mjs'

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`)
}

export const usePreview = definePreview({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  documentLimit: 10000,
  onPublicAccessOnly,
})
