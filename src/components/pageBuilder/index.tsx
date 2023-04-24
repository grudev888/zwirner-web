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

interface ComponentsShape {
  content: any
  props: any
  _type: string
}

interface PageBuilderProps {
  components: ComponentsShape[]
}

export const PageBuilder: FC<PageBuilderProps> = ({components = []}) => {
  return (
    <DzColumn className="mb-12 h-full" span={12}>
      {components.map((component, key) => {
        const {_type, props, content = []} = component
        const ComponentModule = componentsIndex[_type]
        const multipleContent = ComponentModule?.multipleContentTypes ?? false
        const componentContent = multipleContent ? content : content?.[0]

        if (!ComponentModule) {
          return <div key={`${_type}-${key}`}>Not supported component: {_type}</div>
        }
        if(!componentContent) {
          return <div key={`${_type}-${key}`}>Please add content types to this component: {props?.title ?? _type}</div>
        }
        return (
          <ComponentModule key={`${_type}-${key}`} data={componentContent} componentProps={props} />
        )
      })}
    </DzColumn>
  )
}

export default PageBuilder
