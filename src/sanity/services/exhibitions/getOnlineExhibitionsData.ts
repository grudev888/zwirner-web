import {SanityClient} from 'next-sanity'

import {
  OnlineExhibitionDataPropsType,
  onlineExhibitionsDataBySlug,
  OnlineExhibitionsDataBySlugSchema,
  OnlineExhibitionsDataPropsSchema,
} from '@/sanity/queries/exhibitions/onlineExhibitionsData'

export async function getOnlineExhibitionsData(
  client: SanityClient,
  params: OnlineExhibitionDataPropsType
) {
  const validatedParams = OnlineExhibitionsDataPropsSchema.parse(params)
  const data = await client.fetch(onlineExhibitionsDataBySlug, validatedParams)
  if (!data) return null
  const validatedData = OnlineExhibitionsDataBySlugSchema.parse(data)
  return validatedData
}
