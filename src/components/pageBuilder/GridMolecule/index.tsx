import {ColumnSpan, DzColumn, DzGridColumns} from '@zwirner/design-system'
import {FC} from 'react'

import {componentsIndex} from '@/components/pageBuilder'
import {gridBuilderMapper} from '@/sanity/mappers/pageBuilder/gridBuilderMapper'

interface GridMappedComponent {
  type: string
  data: any
}
interface GridMoleculeProps {
  data: any
}

const getRows = (numberOfSections: number): ColumnSpan | ColumnSpan[] => {
  if (!numberOfSections) return 1
  if (numberOfSections > 4) return 3
  return (12 / numberOfSections) as ColumnSpan
}

export const GridMolecule: FC<GridMoleculeProps> = ({data = {}}) => {
  const {gridProps = {}} = data
  const {
    itemsPerRow = 1,
    // masonryGrid = false,
    // sortField = 'date',
    // sortOrder = 'asc',
    wrap = false,
  } = gridProps

  const mappedComponents = gridBuilderMapper([gridProps])
  const getColSpan = getRows(itemsPerRow ?? 0)

  return (
    <DzColumn className="mb-12" span={12}>
      <DzGridColumns className="h-full w-full">
        {mappedComponents.map((component: GridMappedComponent, key: number) => {
          const {type, data} = component
          const ComponentModule = componentsIndex[type]
          if (!ComponentModule) {
            return (
              <DzColumn className="mb-5" key={`${key}-${type}`} span={12}>
                <div key={`${key}-${type}`}>Not supported component: {type}</div>
              </DzColumn>
            )
          }
          return (
            <DzColumn className="mb-5" key={`${key}-${type}`} span={getColSpan} wrap={wrap}>
              <ComponentModule data={data} />
            </DzColumn>
          )
        })}
      </DzGridColumns>
    </DzColumn>
  )
}

export default GridMolecule
