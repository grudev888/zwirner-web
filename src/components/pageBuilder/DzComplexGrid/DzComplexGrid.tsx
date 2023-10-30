import {FC} from 'react'

import {DzComplexGrid} from '@/components/wrappers/DzComplexGridWrapper'

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

  return <DzComplexGrid {...gridData} />
}
ComplexGridMolecule.notContentDependant = true
ComplexGridMolecule.multipleContentTypes = true
export default ComplexGridMolecule
