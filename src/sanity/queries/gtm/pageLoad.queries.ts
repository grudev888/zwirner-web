import {groq} from 'next-sanity'
import {z} from 'zod'

import {GTMPageLoadStartedText} from '@/common/constants/gtmConstants'

import {GtmCommonDataSchema} from './validationPrimitives'

export const gtmPageLoadData = groq`
*[defined(slug.current) && slug.current == $slug][0]{
  "event": '${GTMPageLoadStartedText.event}',
  "detailed_event": '${GTMPageLoadStartedText.detailed_event}',
  "page_data": {
    "artist": '',
    "country": '${GTMPageLoadStartedText.page_data.country}',
    "language": '',
    "page_hash": _rev,
    "page_hostname": '',
    "page_location": '',
    "page_path": '',
    "page_query_string": '',
    "page_title": coalesce(seo.pageTitle, title),
    "page_update_date": _updatedAt,
    "site_section": '',
  },
  "user_data": {
    "shopify_52w": '',
    "shopify_dzb": '',
    "shopify_dzw": '',
    "user_id": '',
    "visitor_id": '',
  },
}
`

export const GtmPageLoadDataPropsSchema = z.object({
  slug: z.string().min(1),
})

export type GtmPageLoadDataPropsType = z.infer<typeof GtmPageLoadDataPropsSchema>

// TODO: Describe properly z.any() types
export const GtmPageLoadDataSchema = z
  .object({
    page_data: z.object({
      artist: z.string(),
      country: z.string(),
      language: z.string(),
      page_hash: z.string(),
      page_hostname: z.string(),
      page_location: z.string(),
      page_path: z.string(),
      page_query_string: z.string(),
      page_title: z.string(),
      page_update_date: z.string().min(1),
      site_section: z.string(),
    }),
    user_data: z.object({
      shopify_52w: z.string(),
      shopify_dzb: z.string(),
      shopify_dzw: z.string(),
      user_id: z.string(),
      visitor_id: z.string(),
    }),
  })
  .merge(GtmCommonDataSchema)

export type GtmPageLoadDataType = z.infer<typeof GtmPageLoadDataSchema>
