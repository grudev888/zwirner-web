import {componentMapper, contentTransformer} from '@/sanity/mappers/components'
export const homeMapper = (data: any[]) => {
  if (!data.length) return data
  const [fetchedData = {}] = data
  const {components: rows} = fetchedData
  if (!rows || !rows.length) return data
  const rowData = rows.map((row: any) => {
    const {components, ...restOfRow} = row
    const rowComponents =
      components?.map((component: any) => {
        const {_type, ...rest} = component
        const mapper: any = componentMapper?.[_type] ?? ((d: any) => d)
        return {
          type:_type,
          data: mapper(contentTransformer(rest)),
        }
      }) ?? []

    return {...restOfRow, components: rowComponents}
  }, {})
  return rowData
}
