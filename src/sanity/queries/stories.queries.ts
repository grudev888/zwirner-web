import {groq} from 'next-sanity'

import {articlesReferences} from '@/sanity/queries/article.queries'
import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'

export const storiesData = groq`
*[_type == "stories" ] {
  ...,
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
      type,
      provider == "custom" && type == 'video' => {
        provider,
        type,
        "externalVideo": video.asset->url
      },
      (provider == "youtube" || provider == "vimeo") && type == 'video'=> {
        provider,
        type,
        externalVideo
      },
      type == 'image' => {
        image
      }
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
      _type == "fairPage"=> {
        ...,
        slug,
        title,
        _type,
        "exhibition": exhibition-> {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      }
    }
  }

}`
