import {DzCard as DzCardMolecule} from '@zwirner/design-system'
import {FC} from 'react'

import {contentTypesMapper} from './cardMapper'

interface DzCardProps {
  data: any
}

export const DzCard: FC<DzCardProps> = ({data}) => {
  const {_type} = data ?? {}
  const mappedData = (contentTypesMapper[_type] ?? ((a: any) => a))(data) ?? {}

  return <DzCardMolecule {...mappedData} />
}

export default DzCard
