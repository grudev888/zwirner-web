import {groq} from 'next-sanity'

import {exhibitionComplexFields, exhibitionSimpleFields} from '@/sanity/queries/exhibition.queries'
import {mediaBuilder} from '@/sanity/queries/object.queries'

export const fieldsPerType = groq`
  _type,
  _type =='exhibitionPage' => {
    ${exhibitionSimpleFields}
    ${exhibitionComplexFields}
  },
  _type =='artist' => {
    ...
  },
  _type =='article' => {
    ...,
    header[]{
    ${mediaBuilder}
    },
    image {
      image {
        ...
      }
    },
    location->
  },
  _type =='artwork' => {
    ...,
    photos[]{
      ...,
      ${mediaBuilder}
    },
    "artists": artists[]->
  },
  _type == 'book' => {
    title,
    tagline,
    publisher,
    booksUrl,
    photos,
    subtitle,
    isbn,
    dateSelection,
    description,
    price,
    "authors": authors[]->,
    "artists": artists[]->,
  },
  _type == 'press' => {
    ...,
    "authors": authors[]->
  },
  _type =='location' => {
    ...
  },
  _type =='podcast' => {
    ...
  },
`
export const componentTypesData = groq`
  content[]-> {
   ${fieldsPerType}
  },
`

// Must follow DzCardSchemaProps
export const dzCardProps = groq`
  _type == 'dzCard' => {
    'props': {
      title,
      primaryCTA,
      secondaryCTA,
      mediaOverride {
        ${mediaBuilder}
      },
      enableOverrides,
      secondaryTitle,
      pressVariation,
      bookVariation,
      primarySubtitle,
      secondarySubtitle,
      additionalInformation,
    }
  },
`

// Must follow DzEditorialSchemaProps
export const dzEditorialProps = groq`
  _type == 'dzEditorial' => {
    'props': {
      title,
      quoteTitle,
      quoteFootNote,
      editorialType,
      editorialTextOverrides,
      editorialTextOverridesSimple,
      imageOverride,
      reverse
    }
  },
`

// Must follow DzHeroSchemaProps
export const dzHeroProps = groq`
  _type == 'dzHero' => {
    'props': {
      title,
      headingOverride,
      subHeadingOverride,
      secondaryTitleOverride,
      descriptionOverride,
      imageOverride,
      enableOverrides,
    }
  },
`

// Must follow DzHeroCarouselSchemaProps
export const dzHeroCarouselProps = groq`
  _type == 'dzHeroCarousel' => {
    'props': {
      title,
      headingOverride,
      pictures,
      enableOverrides,
    }
  },
`

// Must follow DzInterstitialTypeProps
export const dzInterstitialProps = groq`
  _type == 'dzInterstitial' => {
    'props': {
      title,
      mode,
      cta,
      image {
        ${mediaBuilder}
      },
      subtitle,
      eyebrow
    }
  },
`

// Must follow DzSplitTypeProps
export const dzSplitProps = groq`
  _type == 'dzSplit' => {
    'props': {
      title,
      splitType,
      reverse,
      animate,
      media {
        ${mediaBuilder}
      },
      enableOverrides,
      primaryCTA
    }
  },
`

// Must follow DzTitleTypeProps
export const dzTitleProps = groq`
  _type == 'dzTitle' => {
    'props': {
      title,
      enableOverrides,
    }
  },
`
// Must follow DzMediaSchemaProps
export const dzMediaProps = groq`
  _type == 'dzMedia' => {
    'props': {
      title,
      media {
        ${mediaBuilder}
      },
      caption
    }
  },
`

// Must follow DzCarouselSchemaProps
export const dzCarouselProps = groq`
  _type == 'dzCarousel' => {
    'props': {
      title,
      size,
      dzCarousel[]{
        ${componentTypesData}
        ${dzMediaProps}
        ${dzCardProps}
        _type,
      }
    }
  },
`

// Must follow GridMoleculeTypeProps
export const gridMoleculeProps = groq`
  _type == 'grid' => {
    'props': {
      title,
      wrap,
      itemsPerRow,
      grid[]{
        ${componentTypesData}
        ${dzMediaProps}
        ${dzCardProps}
        _type,
      }
    }
  },
`
