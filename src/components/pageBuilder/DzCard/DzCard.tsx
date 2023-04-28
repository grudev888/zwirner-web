import {DzCard as DzCardMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {DzCardSchemaProps} from '@/sanity/schema/objects/page/components/molecules/dzCard'

import {contentTypesMapper} from './cardMapper'

interface DzCardProps {
  data: any
  componentProps?: DzCardSchemaProps
}

export const DzCard: FC<DzCardProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data, componentProps) ?? {}

  return <DzCardMolecule {...mappedData} />
}

export default DzCard
