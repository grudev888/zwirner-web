import {SanityClient} from 'next-sanity'

import {
  type PageBySlugPropsType,
  pageBySlug,
  PageBySlugPropsSchema,
  PageBySlugSchema,
} from '@/sanity/queries/page/pageBySlug'

// TODO: add validation error handling
export async function getPageBySlug(client: SanityClient, params: PageBySlugPropsType) {
  const validatedParams = PageBySlugPropsSchema.parse(params)
  const data = await client.fetch(pageBySlug, validatedParams)
  if (!data) return null
  const validatedData = PageBySlugSchema.parse(data)
  return validatedData
}
