import {ColumnSpan, DzColumn, DzGridColumns} from '@zwirner/design-system'
import {FC} from 'react'

import {DzCard} from '@/components/pageBuilder/DzCard/DzCard'
import {DzMedia} from '../DzMedia/DzMedia'

interface GridMoleculeProps {
  data: any
  componentProps?: any
}

export const componentsIndex: any = {
  dzCard: DzCard,
  dzMedia: DzMedia,
}

const getRows = (numberOfSections: number): ColumnSpan | ColumnSpan[] => {
  if (!numberOfSections) return 1
  if (numberOfSections > 4) return 3
  return (12 / numberOfSections) as ColumnSpan
}

export const GridMolecule: FC<GridMoleculeProps> & {multipleContentTypes: boolean} & {
  notContentDependant: boolean
} = ({componentProps}) => {
  const {itemsPerRow = 1, wrap = false, grid = []} = componentProps
  const getColSpan = getRows(itemsPerRow ?? 0)

  return (
    <DzColumn className="mb-12" span={12}>
      <DzGridColumns className="h-full w-full">
        {grid?.map((component: any, key: number) => {
          const {_type, props, content = []} = component
          const ComponentModule = componentsIndex[_type]
          const multipleContent = ComponentModule?.multipleContentTypes ?? false
          const innerNotContentDependant = ComponentModule?.notContentDependant ?? false
          const componentContent = multipleContent ? content : content?.[0]
          if (!ComponentModule) {
            console.warn('PAGE BUILDER::: Not supported component for the grid:', _type)
            return null
          }
          if (!componentContent && !innerNotContentDependant) {
            console.warn(
              'PAGE BUILDER::: Please add content types to this component inside of the grid:',
              props?.title ?? _type
            )
            return null
          }
          return (
            <DzColumn className="mb-5" key={`grid-section-${key}`} span={getColSpan} wrap={wrap}>
              <ComponentModule
                key={`${_type}-${key}`}
                data={componentContent}
                componentProps={{...props, isOnGrid: true}}
              />
            </DzColumn>
          )
        })}
      </DzGridColumns>
    </DzColumn>
  )
}
GridMolecule.notContentDependant = true
GridMolecule.multipleContentTypes = true
export default GridMolecule
