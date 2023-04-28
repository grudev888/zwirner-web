import {DzSplit as DzSplitMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzSplitTypeProps} from '@/sanity/schema/objects/page/components/molecules/dzSplit'

import {splitMappers} from './splitMappers'

interface DzSplitProps {
  data: any
  componentProps?: DzSplitTypeProps
}

export const DzSplit: FC<DzSplitProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (splitMappers[_type] ?? ((a: any) => a))(data, componentProps)

  return <DzSplitMolecule {...mappedData} />
}

export default DzSplit
