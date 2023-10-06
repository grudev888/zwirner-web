import {client} from '@/sanity/client'
import {
  OnlineExhibitionDataPropsType,
  onlineExhibitionsDataBySlug,
  OnlineExhibitionsDataBySlugSchema,
  OnlineExhibitionsDataPropsSchema,
} from '@/sanity/queries/exhibitions/onlineExhibitionsData'

export async function getOnlineExhibitionsData(params: OnlineExhibitionDataPropsType) {
  const validatedParams = OnlineExhibitionsDataPropsSchema.parse(params)
  const data = await client.fetch(onlineExhibitionsDataBySlug, validatedParams)
  if (!data) return null
  const validatedData = OnlineExhibitionsDataBySlugSchema.parse(data)
  return validatedData
}
