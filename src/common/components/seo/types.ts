import {GlobalSEOScheme, PageSEOSchema} from '@/sanity/types'

export type SEORawData = GlobalSEOScheme | PageSEOSchema | undefined
export interface SEOComponentProps {
  isDefault?: boolean
  data: SEORawData
}
