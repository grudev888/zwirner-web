import {MasterDetailIcon} from '@sanity/icons'
import {defineArrayMember,defineType} from 'sanity'

export default defineType({
  name: 'pageBuilderComponents',
  title: 'Components',
  type: 'array',
  icon: MasterDetailIcon,
  of: [
    defineArrayMember({
      name: 'dzHero',
      title: 'Hero',
      type: 'dzHero',
    }),
    defineArrayMember({
      name: 'dzHeroCarousel',
      title: 'HeroCarousel',
      type: 'dzHeroCarousel',
    }),
    defineArrayMember({
      name: 'dzCarousel',
      title: 'Carousel',
      type: 'dzCarousel',
    }),
    defineArrayMember({
      name: 'grid',
      title: 'Grid',
      type: 'grid',
    }),
    defineArrayMember({
      name: 'dzCard',
      title: 'Card',
      type: 'dzCard',
    }),
    defineArrayMember({
      name: 'dzEditorial',
      title: 'Editorial',
      type: 'dzEditorial',
    }),
    defineArrayMember({
      name: 'dzInterstitial',
      title: 'Interstitial',
      type: 'dzInterstitial',
    }),
    defineArrayMember({
      name: 'dzSplit',
      title: 'Split',
      type: 'dzSplit',
    }),
    defineArrayMember({
      name: 'dzTitle',
      title: 'Title',
      type: 'dzTitle',
    }),
  ],
})
