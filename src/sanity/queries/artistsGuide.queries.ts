import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {mediaBuilder} from '@/sanity/queries/object.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const artistGuidePageBySlug = groq`
*[_type == "artistPage" && defined(slug.current) && slug.current == $slug][]{
  title,
  slug,
  artist->,
  guideInterstitialSubpage {
    ...,
    image {
      ${mediaBuilder}
    }
  },
  guideSubpage {
    title,
    itemsPerRow,
    displayNumberOfResults,
    items[]-> {
      ...,
      header[]{
        ${mediaBuilder}
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
  "seo": guideSeo {
    ${pageSEOFields}
  },
}`

export const allGuidePageSlugs = groq`
*[_type == "artistPage" && defined(slug.current) && defined(guideSubpage.title)][]{
  "params": { "slug": slug.current }
}`
