import {DzComplexGrid} from '@zwirner/design-system'
import Link from 'next/link'
import {FC} from 'react'

import {cardsMapper} from './dzComplexGridMapper'

type DzComplexGridMoleculeProps = {
  data: any
  componentProps?: any
}

export const ComplexGridMolecule: FC<DzComplexGridMoleculeProps> & {
  multipleContentTypes: boolean
  notContentDependant: boolean
} = ({componentProps}) => {
  const gridData = cardsMapper(componentProps)

  return <DzComplexGrid {...gridData} LinkElement={Link} />
}
ComplexGridMolecule.notContentDependant = true
ComplexGridMolecule.multipleContentTypes = true
export default ComplexGridMolecule
