import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const artistGuidePageBySlug = groq`
*[_type == "artistPage" && defined(slug.current) && slug.current == $slug][]{
  title,
  slug,
  artist->,
  guideInterstitialSubpage,
  guideSubpage {
    title,
    itemsPerRow,
    displayNumberOfResults,
    items[]-> {
      ...,
      _type == "fairPage"=> {
        slug,
        title,
        _type,
        "exhibition":  {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      },
      _type == "exhibitionPage"=> {
        title,
        _type,
        "exhibition":  {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      }
    }
  },
  seo {
    ${pageSEOFields}
  },
}`

export const allGuidePageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && defined(guideSubpage.title)][]{
  "params": { "slug": slug.current }
}`
