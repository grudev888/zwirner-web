import {PageSEOFieldsType} from '@/sanity/queries/components/seo/pageSEOFields'
import {GlobalSEOScheme} from '@/sanity/types'

export type SEORawData = GlobalSEOScheme | PageSEOFieldsType | undefined
export interface SEOComponentProps {
  isDefault?: boolean
  data: SEORawData
}
