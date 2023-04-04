import {DzSplit as DzSplitMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {splitMappers} from './splitMappers'

interface DzSplitProps {
  data: any
}

export const DzSplit: FC<DzSplitProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (splitMappers[_type] ?? ((a: any) => a))(data)
  console.log('DATAAAA:::', _type, data)

  return <DzSplitMolecule {...mappedData} />
}

export default DzSplit
