import {DzHero as DzHeroMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {contentTypesMapper} from './heroMapper'

interface DzHeroProps {
  data: any
}

export const DzHero: FC<DzHeroProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data)

  return <DzHeroMolecule {...mappedData} />
}

export default DzHero
