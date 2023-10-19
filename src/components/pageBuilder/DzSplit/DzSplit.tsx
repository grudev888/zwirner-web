import {DzSplit as DzSplitMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzSplitTypeProps} from '@/sanity/types'

import {dzSplitOverrides, splitMappers} from './splitMappers'

interface DzSplitProps {
  data: any
  componentProps?: DzSplitTypeProps
}

export const DzSplit: FC<DzSplitProps> & {notContentDependant: boolean} = ({
  data,
  componentProps,
}) => {
  const {_type} = data ?? {}
  const mappedData = (splitMappers?.[_type] ?? ((a: any) => a))(data, componentProps)
  const overrideData = componentProps ? dzSplitOverrides(componentProps) : {}

  return <DzSplitMolecule {...{...mappedData, ...overrideData}} />
}

DzSplit.notContentDependant = true

export default DzSplit
