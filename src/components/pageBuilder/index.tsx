import {DzColumn} from '@zwirner/design-system'
import {FC} from 'react'

import {DzCard} from './DzCard/DzCard'
import {DzEditorial} from './DzEditorial/DzEditorial'
import {DzHero} from './DzHero/DzHero'
import {DzInterstitial} from './DzInterstitial/DzInterstitial'
import {DzSplit} from './DzSplit/DzSplit'
import {DzTitle} from './DzTitle/DzTitle'
import {GridMolecule} from './GridMolecule'

export const componentsIndex: any = {
  dzHero: DzHero,
  dzCard: DzCard,
  dzEditorial: DzEditorial,
  dzSplit: DzSplit,
  dzTitle: DzTitle,
  dzInterstitial: DzInterstitial,
  grid: GridMolecule,
}
interface PageBuilderProps {
  components: any[]
}

export const PageBuilder: FC<PageBuilderProps> = ({components = {}}) => {
  return (
    <DzColumn className="mb-12 h-full" span={12}>
      {Object.entries(components).map((component, key) => {
        const [type, data] = component
        const ComponentModule = componentsIndex[type]
        if (!ComponentModule) {
          return <div key={`${type}-${key}`}>Not supported component: {type}</div>
        }
        return <ComponentModule key={`${type}-${key}`} data={data} />
      })}
    </DzColumn>
  )
}

export default PageBuilder
