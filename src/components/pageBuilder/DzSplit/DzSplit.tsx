import {useRouter} from 'next/router'

import {DzSplit as DzSplitMolecule} from '@/components/wrappers/DzSplitWrapper'
import {DzSplitTypeProps} from '@/sanity/types'

import {dzSplitOverrides, splitMappers} from './splitMappers'

type DzSplitProps = {
  data: any
  componentProps?: DzSplitTypeProps
}

export const DzSplit = ({data, componentProps}: DzSplitProps & {notContentDependant: boolean}) => {
  const router = useRouter()
  const {_type} = data ?? {}
  const mappedData = (splitMappers?.[_type] ?? ((a: any) => a))(data, {...componentProps, router})
  const overrideData = componentProps ? dzSplitOverrides({...componentProps, router}) : {data: {}}

  const {data: mappedInnerData} = mappedData ?? {}
  const {data: overrideInnerData} = overrideData ?? {}
  const mergedData = {...mappedInnerData, ...overrideInnerData}
  return <DzSplitMolecule {...{...mappedData, ...overrideData, data: mergedData}} />
}

DzSplit.notContentDependant = true

export default DzSplit
