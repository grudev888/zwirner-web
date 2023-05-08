import {groq} from 'next-sanity'

// Must follow GridMoleculeTypeProps
export const gridMoleculeProps = groq`
  _type == 'grid' => {
    'props': {
      title,
      masonryGrid,
      wrap,
      itemsPerRow,
      sortField,
      sortOrder,
      enableOverrides,
    }
  },
`

// Must follow DzCardSchemaProps
export const dzCardProps = groq`
  _type == 'dzCard' => {
    'props': {
      title,
      primaryCTA,
      secondaryCTA,
      imageOverride,
      enableOverrides,
    }
  },
`

// Must follow DzCarouselSchemaProps
export const dzCarouselProps = groq`
  _type == 'dzCarousel' => {
    'props': {
      title,
      enableOverrides,
    }
  },
`

// Must follow DzEditorialSchemaProps
export const dzEditorialProps = groq`
  _type == 'dzEditorial' => {
    'props': {
      title,
      editorialType,
      editorialTextOverrides,
      imageOverride,
      enableOverrides,
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
      split,
      imageOverride,
      enableOverrides,
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
      imageOverride,
      enableOverrides,
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
