import {groq} from 'next-sanity'

import {articlesReferences} from '@/sanity/queries/article.queries'
import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {mediaBuilder} from '@/sanity/queries/object.queries'

export const storiesData = groq`
*[_type == "stories" ] {
  ...,
  mailingListInterstitial {
    ...,
    image {
      ${mediaBuilder}
    }
  },
  ${articlesReferences},
  featuredBooks[0]._type == 'splitBook' => {
     featuredBooks [0]-> {
      ...,
      artists[]->
     }
  },
  featuredBooks[0]._type == 'carouselBooks' => {
     featuredBooks [0]{
      ...,
       items[]-> {
          ...,
          artists[]->
        }
     }
  },
  featuredPodcast->,
  featuredVideos {
    ...,
    featuredMedia {
     ${mediaBuilder}
    }
  },
  hero {
    heroCta {
      ...,
      'fileURL': file.asset->url,
    },
    heroReference[]-> {
    _type == "exhibitionPage"=> {
        ...,
        slug,
        title,
        _type,
        "exhibition": exhibition-> {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      },
    }
  }

}`
