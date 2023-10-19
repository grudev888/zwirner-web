import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

export const showGridSection = (data: PageBuilderComponentsDataSchemaType) => {
  if (data?._type !== 'grid') return false
  const {props} = data ?? {}
  const {grid} = props ?? {}
  const hasGridItems = grid?.length
  return hasGridItems
}
