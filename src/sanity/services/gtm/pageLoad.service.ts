import {client} from '@/sanity/client'
import {
  gtmPageLoadData,
  GtmPageLoadDataPropsSchema,
  GtmPageLoadDataPropsType,
  GtmPageLoadDataSchema,
} from '@/sanity/queries/gtm/pageLoad.queries'

// TODO: add validation error handling
export async function getGTMPageLoadData(params: GtmPageLoadDataPropsType) {
  const validatedParams = GtmPageLoadDataPropsSchema.parse(params)
  const data = await client.fetch(gtmPageLoadData, validatedParams)
  if (!data) return null
  const validatedData = GtmPageLoadDataSchema.parse(data)
  return validatedData
}
