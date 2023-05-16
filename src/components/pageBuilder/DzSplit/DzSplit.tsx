import {DzSplit as DzSplitMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzSplitTypeProps} from '@/sanity/types'

import {dzSplitOverrides,splitMappers} from './splitMappers'

interface DzSplitProps {
  data: any
  componentProps: DzSplitTypeProps
}

export const DzSplit: FC<DzSplitProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (splitMappers[_type] ?? ((a: any) => a))(data, componentProps)
  const overrideData = dzSplitOverrides(componentProps) ?? {}

  return <DzSplitMolecule {...{...mappedData, ...overrideData}} />
}

export default DzSplit
