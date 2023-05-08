import {DzCard as DzCardMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzCardSchemaProps} from '@/sanity/types'

import {contentTypesMapper, dzCardOverrides} from './cardMapper'

interface DzCardProps {
  data: any
  componentProps: DzCardSchemaProps
}

export const DzCard: FC<DzCardProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data, componentProps) ?? {}
  const overrideData = dzCardOverrides(componentProps) ?? {}

  return <DzCardMolecule {...{...mappedData, ...overrideData}} />
}

export default DzCard
