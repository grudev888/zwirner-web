import {DzHero as DzHeroMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzHeroSchemaProps} from '@/sanity/schema/objects/page/components/molecules/dzHero'

import {contentTypesMapper} from './heroMapper'

interface DzHeroProps {
  data: any
  componentProps?: DzHeroSchemaProps
}

export const DzHero: FC<DzHeroProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data, componentProps)

  return <DzHeroMolecule {...mappedData} />
}

export default DzHero
