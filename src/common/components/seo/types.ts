import {PageSEOFieldsWithTitleType} from '@/sanity/queries/components/seo/pageSEOFields'
import {GlobalSEOScheme} from '@/sanity/types'

export type SEORawData = GlobalSEOScheme | PageSEOFieldsWithTitleType | undefined | null
export interface SEOComponentProps {
  isDefault?: boolean
  data: SEORawData
}
