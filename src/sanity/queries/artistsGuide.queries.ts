import {groq} from 'next-sanity'

import {mediaBuilder} from './components/builders/mediaBuilder'
import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from './components/content/exhibitionPageContent'
import {pageSEOFields} from './components/seo/pageSEOFields'

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
