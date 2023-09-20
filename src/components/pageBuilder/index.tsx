import {DzColumn} from '@zwirner/design-system'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

import {DzCard} from './DzCard/DzCard'
import {CarouselMolecule} from './DzCarousel/DzCarousel'
import {DzEditorial} from './DzEditorial/DzEditorial'
import {DzHero} from './DzHero/DzHero'
import {DzInterstitial} from './DzInterstitial/DzInterstitial'
import {DzMedia} from './DzMedia/DzMedia'
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
  dzMedia: DzMedia,
  dzCarousel: CarouselMolecule,
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
    <DzColumn span={12}>
      <FullWidthFlexCol>
        {components?.map((component, key) => {
          // content is the reference to the content type (artist, exhibition, article...)
          // props is the extra information required to render the component (CTA's, Overrides)
          const {_type, props, content = []} = component
          const ComponentModule = componentsIndex[_type]
          const multipleContent = ComponentModule?.multipleContentTypes ?? false
          const notContentDependant = ComponentModule?.notContentDependant ?? false
          const componentContent = multipleContent ? content : content?.[0]

          if (!ComponentModule) {
            console.warn('PAGE BUILDER::: Not supported component:', _type)
            return null
          }
          if (!componentContent && !notContentDependant) {
            console.warn(
              'PAGE BUILDER::: Please add content types to this component:',
              props?.title ?? _type
            )
            return null
          }
          return (
            <ComponentModule
              key={`${_type}-${key}`}
              data={componentContent}
              componentProps={props}
            />
          )
        })}
      </FullWidthFlexCol>
    </DzColumn>
  )
}

export default PageBuilder
