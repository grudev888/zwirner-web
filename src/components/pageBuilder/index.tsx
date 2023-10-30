import {DzColumn} from '@zwirner/design-system'
import {Fragment} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import styles from '@/components/containers/layout/fullWidthFlexCol.module.css'
import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'

import {DzCard} from './DzCard/DzCard'
import {CarouselMolecule} from './DzCarousel/DzCarousel'
import {showCarouselSection} from './DzCarousel/dzCarouselMapper'
import {DzEditorial} from './DzEditorial/DzEditorial'
import {DzHero} from './DzHero/DzHero'
import {DzInterstitial} from './DzInterstitial/DzInterstitial'
import {showInterstitialSection} from './DzInterstitial/interstitialMapper'
import {DzMedia} from './DzMedia/DzMedia'
import {DzSplit} from './DzSplit/DzSplit'
import {showSplitSection} from './DzSplit/splitMappers'
import {DzTitle} from './DzTitle/DzTitle'
import {GridMolecule} from './GridMolecule'
import {showGridSection} from './GridMolecule/gridMapper'

const componentsIndex: any = {
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

const componentsValidators: any = {
  dzHero: () => true,
  dzCard: () => true,
  dzEditorial: () => true,
  dzSplit: showSplitSection,
  dzInterstitial: showInterstitialSection,
  dzMedia: () => true,
  dzCarousel: showCarouselSection,
  grid: showGridSection,
}

type PageBuilderProps = {
  id?: string
  components: PageBuilderComponentsDataSchemaType[]
  innerSection?: boolean
}
type CTATransformer = {
  component: any
  data: any
  onCTAClick?: () => void
}

export const PageBuilder = ({id, components = [], innerSection = false}: PageBuilderProps) => {
  const ContainerComponent = components.length > 1 ? FullWidthFlexCol : Fragment
  const containerProps =
    components.length > 1 ? {className: innerSection ? styles.pageBuilderSection : ''} : {}
  return (
    <DzColumn id={id} span={12}>
      <ContainerComponent {...containerProps}>
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
            console.warn('PAGE BUILDER::: Please add content types to this component:', _type)
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
      </ContainerComponent>
    </DzColumn>
  )
}

export const showPageBuilderSection = (components: PageBuilderComponentsDataSchemaType[]) => {
  return components?.some((component) => {
    const {_type} = component ?? {}
    const validator = componentsValidators?.[_type] ?? (() => true)
    return validator(component)
  })
}

export const addCTAToComponent = ({
  component,
  data,
  onCTAClick,
}: CTATransformer): PageBuilderComponentsDataSchemaType => {
  let ctaKey = 'primaryCTA'
  if (component === 'dzInterstitial') ctaKey = 'cta'
  return {
    props: {
      ...data?.props,
      [ctaKey]: {
        ...data?.props?.[ctaKey],
        handleClick: onCTAClick,
      },
    },
    _type: data?._type,
  }
}

export default PageBuilder
