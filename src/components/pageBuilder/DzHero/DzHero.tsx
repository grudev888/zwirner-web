import {DzHero as DzHeroMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzHeroSchemaProps} from '@/sanity/types'

import {contentTypesMapper, dzHeroOverrides} from './heroMapper'

interface DzHeroProps {
  data: any
  componentProps: DzHeroSchemaProps
}

export const DzHero: FC<DzHeroProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data)
  const overrideData = dzHeroOverrides(componentProps) ?? {}

  return <DzHeroMolecule {...{...mappedData, ...overrideData}} />
}

export default DzHero
