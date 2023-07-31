import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

import {artworkFields} from './artwork.queries'

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
        "exhibition": {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      }
    }
  },
  comingSoon {
    title,
    exhibitions[]-> {
      _type == "exhibitionPage"=> {
        title,
        _type,
        "exhibition": {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      }
    }
  },
  artworksGrid {
    Title,
    artworks[]->{${artworkFields}},
    itemsPerRow,
  },
  seo {
    ${pageSEOFields}
  },
}`
