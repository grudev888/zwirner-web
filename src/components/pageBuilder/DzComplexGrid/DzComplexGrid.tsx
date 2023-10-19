import {DzComplexGrid} from '@zwirner/design-system'
import {FC} from 'react'

import {cardsMapper} from './dzComplexGridMapper'

interface DzComplexGridMoleculeProps {
  data: any
  componentProps?: any
}

export const ComplexGridMolecule: FC<DzComplexGridMoleculeProps> & {
  multipleContentTypes: boolean
  notContentDependant: boolean
} = ({componentProps}) => {
  const gridData = cardsMapper(componentProps)

  return <DzComplexGrid {...gridData} />
}
ComplexGridMolecule.notContentDependant = true
ComplexGridMolecule.multipleContentTypes = true
export default ComplexGridMolecule
