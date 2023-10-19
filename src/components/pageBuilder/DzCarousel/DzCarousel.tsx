import {
  CardSizes,
  carouselSizeToCardSize,
  DzCarouselCardSize,
  DzColumn,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {DzCard} from '@/components/pageBuilder/DzCard/DzCard'

import {DzMedia} from '../DzMedia/DzMedia'

const DzCarousel = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzCarousel), {
  ssr: false,
})

interface CarouselMoleculeProps {
  data: any
  componentProps?: any
}

const componentsIndex: any = {
  dzCard: DzCard,
  dzMedia: DzMedia,
}

export const CarouselMolecule: FC<CarouselMoleculeProps> & {multipleContentTypes: boolean} & {
  notContentDependant: boolean
} = ({componentProps}) => {
  const {size, dzCarousel = []} = componentProps ?? {}

  return (
    <DzColumn className="mb-12" span={12}>
      <DzCarousel size={size}>
        {dzCarousel?.map((component: any, key: number) => {
          const {_type, props, content = []} = component
          const ComponentModule = componentsIndex[_type]
          const multipleContent = ComponentModule?.multipleContentTypes ?? false
          const innerNotContentDependant = ComponentModule?.notContentDependant ?? false
          const componentContent = multipleContent ? content : content?.[0]
          if (!ComponentModule) {
            console.warn('PAGE BUILDER::: Not supported component for the Carousel:', _type)
            return null
          }
          if (!componentContent && !innerNotContentDependant) {
            console.warn(
              'PAGE BUILDER::: Please add content types to this component inside of the Carousel:',
              props?.title ?? _type
            )
            return null
          }
          return (
            <ComponentModule
              key={`${_type}-${key}`}
              data={componentContent}
              componentProps={{
                ...(props ?? {}),
                cardSize: [CardSizes['12col'], carouselSizeToCardSize[size as DzCarouselCardSize]],
              }}
            />
          )
        })}
      </DzCarousel>
    </DzColumn>
  )
}
CarouselMolecule.notContentDependant = true
CarouselMolecule.multipleContentTypes = true
export default CarouselMolecule
