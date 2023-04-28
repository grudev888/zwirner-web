import {groq} from 'next-sanity'

import dzCardTypeSchema from '@/sanity/schema/objects/page/components/molecules/dzCard'
import dzCarouselTypeSchema from '@/sanity/schema/objects/page/components/molecules/dzCarousel'
import dzEditorialTypeSchema from '@/sanity/schema/objects/page/components/molecules/dzEditorial'
import dzHeroTypeSchema from '@/sanity/schema/objects/page/components/molecules/dzHero'
import dzHeroCarouselTypeSchema from '@/sanity/schema/objects/page/components/molecules/DzHeroCarousel'
import dzInterstitialTypeScheme from '@/sanity/schema/objects/page/components/molecules/dzInterstitial'
import dzSplitTypeSchema from '@/sanity/schema/objects/page/components/molecules/dzSplit'
import dzTitleTypeSchema from '@/sanity/schema/objects/page/components/molecules/dzTitle'
import gridTypeSchema from '@/sanity/schema/objects/page/grid'

// Must follow GridMoleculeTypeProps
export const gridMoleculeProps = groq`
  _type == '${gridTypeSchema.name}' => {
    'props': {
      title,
      masonryGrid,
      wrap,
      itemsPerRow,
      sortField,
      sortOrder,
    }
  },
`

// Must follow DzCardSchemaProps
export const dzCardProps = groq`
  _type == '${dzCardTypeSchema.name}' => {
    'props': {
      title,
      primaryCTA,
      secondaryCTA,
      imageOverride,
    }
  },
`

// Must follow DzCarouselSchemaProps
export const dzCarouselProps = groq`
  _type == '${dzCarouselTypeSchema.name}' => {
    'props': {
      title
    }
  },
`

// Must follow DzEditorialSchemaProps
export const dzEditorialProps = groq`
  _type == '${dzEditorialTypeSchema.name}' => {
    'props': {
      title,
      editorialType,
      editorialTextOverrides,
      imageOverride,
    }
  },
`

// Must follow DzHeroSchemaProps
export const dzHeroProps = groq`
  _type == '${dzHeroTypeSchema.name}' => {
    'props': {
      title,
      headingOverride,
      subHeadingOverride,
      secondaryTitleOverride,
      descriptionOverride,
      imageOverride
    }
  },
`

// Must follow DzHeroCarouselSchemaProps
export const dzHeroCarouselProps = groq`
  _type == '${dzHeroCarouselTypeSchema.name}' => {
    'props': {
      title,
      headingOverride,
      pictures
    }
  },
`

// Must follow DzInterstitialTypeProps
export const dzInterstitialProps = groq`
  _type == '${dzInterstitialTypeScheme.name}' => {
    'props': {
      title,
      split,
      imageOverride
    }
  },
`

// Must follow DzSplitTypeProps
export const dzSplitProps = groq`
  _type == '${dzSplitTypeSchema.name}' => {
    'props': {
      title,
      splitType,
      reverse,
      animate,
      imageOverride
    }
  },
`

// Must follow DzTitleTypeProps
export const dzTitleProps = groq`
  _type == '${dzTitleTypeSchema.name}' => {
    'props': {
      title,
    }
  },
`
