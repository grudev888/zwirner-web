import dynamic from 'next/dynamic'

import {DzHeroSchemaProps} from '@/sanity/types'

import {contentTypesMapper, dzHeroOverrides} from './heroMapper'
const DzHeroMolecule = dynamic(
  () => import('@/components/wrappers/DzHeroWrapper').then((mod) => mod.DzHero),
  {
    ssr: false,
  }
)
type DzHeroProps = {
  data: any
  componentProps?: DzHeroSchemaProps
}

export const DzHero = ({data, componentProps}: DzHeroProps & {multipleContentTypes: boolean}) => {
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
