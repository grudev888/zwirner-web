import dynamic from 'next/dynamic'
import {FC} from 'react'

import {DzHeroSchemaProps} from '@/sanity/types'

import {contentTypesMapper, dzHeroOverrides} from './heroMapper'
const DzHeroMolecule = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzHero), {
  ssr: false,
})
interface DzHeroProps {
  data: any
  componentProps?: DzHeroSchemaProps
}

export const DzHero: FC<DzHeroProps> & {multipleContentTypes: boolean} = ({
  data,
  componentProps,
}) => {
  const heroSlides = data?.map((slide: any) => {
    const {_type} = slide ?? {}
    const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(slide)
    const overrideData = componentProps ? dzHeroOverrides(componentProps) : {}
    return {...mappedData, ...overrideData}
  })
  return <DzHeroMolecule items={heroSlides} />
}

DzHero.multipleContentTypes = true
export default DzHero
