import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {pageSEOFields} from '@/sanity/queries/seo.queries'

export const homeData = groq`
*[_type == 'home'] {
  ...,
  header[]-> {
    _type == "exhibitionPage"=> {
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  },
  featured->{
    _type == "exhibitionPage"=> {
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  },
  firstCarousel{
    ...,
    items[]->{
      ...,
      _type == "exhibitionPage"=> {
        title,
        _type,
        "exhibition": exhibition-> {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      }
    }
  },
  secondCarousel{
    ...,
    items[]->{
      ...,
      _type == "exhibitionPage"=> {
        title,
        _type,
        "exhibition": exhibition-> {
          ${exhibitionSimpleFields}
          ${exhibitionComplexFields}
        },
      }
    }
  },
  articles[]-> { ... },
  locations[]-> {...},
  seo {
    ${pageSEOFields}
  }
}`
