import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {mediaBuilder} from '@/sanity/queries/object.queries'
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
