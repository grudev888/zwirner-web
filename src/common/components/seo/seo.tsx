import {DefaultSeo, NextSeo} from 'next-seo'
import {FC} from 'react'

import {GlobalSEOScheme} from '@/sanity/schema/documents/globalSEO'
import {PageSEOSchema} from '@/sanity/schema/objects/page/seo'

import {defaultSeoMapper, perPageSeoMapper} from './mapper'
import {SEOComponentProps} from './types'

export const SEOComponent: FC<SEOComponentProps> = ({isDefault = false, data}) => {
  if (isDefault) {
    return <DefaultSeo {...defaultSeoMapper(data as GlobalSEOScheme)} />
  }
  return <NextSeo {...perPageSeoMapper(data as PageSEOSchema)}/>
}
