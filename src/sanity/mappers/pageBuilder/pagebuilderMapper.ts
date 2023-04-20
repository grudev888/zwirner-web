import {componentMapper, contentTransformer} from '@/sanity/mappers/components'
export const pageBuilderMap = (data: any[]) => {
  if (!data.length) return data
  const [fetchedData = {}] = data
  const {components} = fetchedData
  if (!components || !components.length) return data
  const mappedData = components.reduce((prev: any, component: any) => {
    const {_type, ...rest} = component
    const mapper: any = componentMapper[_type] ?? ((d: any) => d)
    prev[_type] = mapper(contentTransformer(rest))
    return prev
  }, {})
  return mappedData
}
