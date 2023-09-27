import {groq} from 'next-sanity'

import {artworkFields} from './artwork.queries'
import {mediaBuilder} from './components/builders/mediaBuilder'
import {
  exhibitionComplexFields,
  exhibitionSimpleFields,
} from './components/content/exhibitionPageContent'
import {pageSEOFields} from './components/seo/pageSEOFields'

export const utopiaEditionsData = groq`
*[_type == "utopiaEditions" ] {
  ...,
  media {
    type == "video" => {
      "url":video.asset->url
    },
    ...
  },
  nowAvailable {
    title,
    exhibitions[]-> {
      _type == "exhibitionPage"=> {
        title,
        _type,
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      }
    }
  },
  comingSoon {
    title,
    exhibitions[]-> {
      _type == "exhibitionPage"=> {
        title,
        _type,
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      }
    }
  },
  artworksGrid {
    Title,
    artworks[]->{${artworkFields}},
    itemsPerRow,
  },
  interstitial {
    ...,
    image{
      ${mediaBuilder}
    }
  },
  seo {
    ${pageSEOFields}
  },
}`
