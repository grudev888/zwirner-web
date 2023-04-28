import {groq} from 'next-sanity'

import {redirects} from '@/sanity/queries/redirects.queries'
import {generalSEO} from '@/sanity/queries/seo.queries'

export const generalSettings = groq`{
  'globalSEO': ${generalSEO},
  'redirects': ${redirects}
}
`
