import {SanityClient} from 'next-sanity'

import {
  exhibitionPageBySlug,
  ExhibitionPageBySlugPropsSchema,
  ExhibitionPageBySlugPropsType,
  ExhibitionPageBySlugSchema,
} from '@/sanity/queries/exhibitions/exhibitionPageBySlug'

export async function getExhibitionPageBySlug(
  client: SanityClient,
  params: ExhibitionPageBySlugPropsType
) {
  const validatedParams = ExhibitionPageBySlugPropsSchema.parse(params)
  const data = await client.fetch(exhibitionPageBySlug, validatedParams)
  if (!data) return null
  const validatedData = ExhibitionPageBySlugSchema.parse(data)
  return validatedData
}
