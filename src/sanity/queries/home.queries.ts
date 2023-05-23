import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'

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
  firstCarousel[] -> {
    _id,
    _type == "exhibitionPage"=> {
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  },
  secondCarousel[] -> {
    _id,
    _type == "exhibitionPage"=> {
      title,
      _type,
      "exhibition": exhibition-> {
        ${exhibitionSimpleFields}
        ${exhibitionComplexFields}
      },
    }
  },
  articles[]-> {
    _id,
    _type == "articlePage"=> {
      title,
      subtitle,
      _type,
      "artile": artile-> {
        ...
      },
    }
  },
  locations[]-> {...}
}`
