import {ColumnSpan, DzColumn, DzGridColumns} from '@zwirner/design-system'
import {FC} from 'react'

import {DzCard} from '@/components/pageBuilder/DzCard/DzCard'

interface GridMoleculeProps {
  data: any
  componentProps?: any
}

const getRows = (numberOfSections: number): ColumnSpan | ColumnSpan[] => {
  if (!numberOfSections) return 1
  if (numberOfSections > 4) return 3
  return (12 / numberOfSections) as ColumnSpan
}

export const GridMolecule: FC<GridMoleculeProps> & {multipleContentTypes: boolean} = ({
  data = {},
  componentProps,
}) => {
  const {
    itemsPerRow = 1,
    // masonryGrid = false,
    // sortField = 'date',
    // sortOrder = 'asc',
    wrap = false,
  } = componentProps

  const getColSpan = getRows(itemsPerRow ?? 0)

  return (
    <DzColumn className="mb-12" span={12}>
      <DzGridColumns className="h-full w-full">
        {data.map((cardSchemaType: any, key: number) => {
          return (
            <DzColumn className="mb-5" key={`grid-section-${key}`} span={getColSpan} wrap={wrap}>
              <DzCard data={cardSchemaType} componentProps={{enableOverrides: false, title: ''}} />
            </DzColumn>
          )
        })}
      </DzGridColumns>
    </DzColumn>
  )
}

GridMolecule.multipleContentTypes = true
export default GridMolecule
