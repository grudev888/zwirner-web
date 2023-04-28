import {GlobalSEOScheme} from '@/sanity/schema/documents/globalSEO'
import {PageSEOSchema} from '@/sanity/schema/objects/page/seo'

export type SEORawData = GlobalSEOScheme | PageSEOSchema| undefined
export interface SEOComponentProps {
  isDefault?: boolean
  data: SEORawData
}
