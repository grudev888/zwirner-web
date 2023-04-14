import {ColumnSpan, DzColumn, DzGridColumns} from '@zwirner/design-system'
import {FC} from 'react'

import {DzCard} from './DzCard/DzCard'
import {DzEditorial} from './DzEditorial/DzEditorial'
import {DzHero} from './DzHero/DzHero'
import {DzInterstitial} from './DzInterstitial/DzInterstitial'
import {DzSplit} from './DzSplit/DzSplit'
import {DzTitle} from './DzTitle/DzTitle'

const componentsIndex: any = {
  dzHero: DzHero,
  dzCard: DzCard,
  dzEditorial: DzEditorial,
  dzSplit: DzSplit,
  dzTitle: DzTitle,
  dzInterstitial: DzInterstitial,
}
interface PageBuilderProps {
  rows: any[]
}
const getRows = (numberOfSections: number): ColumnSpan | ColumnSpan[] => {
  if (!numberOfSections) return 1
  if (numberOfSections > 4) return 3
  return (12 / numberOfSections) as ColumnSpan
}
export const PageBuilder: FC<PageBuilderProps> = ({rows = []}) => {
  return (
    <DzColumn className="h-screen px-5" span={12}>
      <DzGridColumns className="h-full w-full">
        {rows.map((row: any) => {
          const {components} = row
          const getColSpan = getRows(components?.length ?? 0)
          return components?.map((section: any, k: number) => {
            const {type, data} = section
            const Component = componentsIndex[type]
            const renderComponent = !Component ? (
              <DzColumn className="mb-5" key={`${k}-${type}`} span={getColSpan}>
                <div key={`${k}-${type}`}>Not supported component: {type}</div>
              </DzColumn>
            ) : (
              <DzColumn className="mb-5" key={`${k}-${type}`} span={getColSpan}>
                <Component className="" data={data} />
              </DzColumn>
            )
            return renderComponent
          })
        })}
      </DzGridColumns>
    </DzColumn>
  )
}

export default PageBuilder
