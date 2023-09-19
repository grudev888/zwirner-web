import {client} from '@/sanity/client'
import {
  gtmPageLoadData,
  gtmPageLoadDataPropsSchema,
  GtmPageLoadDataPropsType,
  gtmPageLoadDataSchema,
} from '@/sanity/queries/gtm/pageLoad.queries'

// TODO: add validation error handling
export async function getGTMPageLoadData(params: GtmPageLoadDataPropsType) {
  const validatedParams = gtmPageLoadDataPropsSchema.parse(params)
  const data = await client.fetch(gtmPageLoadData, validatedParams)
  if (!data) return null
  const validatedData = gtmPageLoadDataSchema.parse(data)
  return validatedData
}
