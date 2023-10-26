import {DzSplit as DzSplitMolecule} from '@zwirner/design-system'
import Link from 'next/link'

import {DzSplitTypeProps} from '@/sanity/types'

import {dzSplitOverrides, splitMappers} from './splitMappers'

type DzSplitProps = {
  data: any
  componentProps?: DzSplitTypeProps
}

export const DzSplit = ({data, componentProps}: DzSplitProps & {notContentDependant: boolean}) => {
  const {_type} = data ?? {}
  const mappedData = (splitMappers?.[_type] ?? ((a: any) => a))(data, componentProps)
  const overrideData = componentProps ? dzSplitOverrides(componentProps) : {}

  return <DzSplitMolecule {...{...mappedData, ...overrideData}} LinkElement={Link} />
}

DzSplit.notContentDependant = true

export default DzSplit
