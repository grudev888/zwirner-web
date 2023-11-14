import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

export const showCarouselSection = (data: PageBuilderComponentsDataSchemaType) => {
  if (data?._type !== 'dzCarousel') return false
  const {props} = data ?? {}
  const {dzCarousel} = props ?? {}
  const hasCarouselItems = dzCarousel?.length
  return !!hasCarouselItems
}
