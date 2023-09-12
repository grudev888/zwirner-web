import {DzCard as DzCardMolecule, CardSizes} from '@zwirner/design-system'
import {FC} from 'react'

import {DzCardExtendedProps} from '@/sanity/types'
import {contentTypesMapper, dzCardOverrides} from './cardMapper'

interface DzCardProps {
  data: any
  componentProps: DzCardExtendedProps
}

export const DzCard: FC<DzCardProps> = ({data, componentProps}) => {
  const {_type} = data ?? {}
  const mappedData =
    (contentTypesMapper[_type] ?? ((a: any) => a))(data, {
      ...(componentProps ?? {}),
      cardSize: CardSizes['12col'],
    }) ?? {}
  const overrideData =
    dzCardOverrides({...(componentProps ?? {}), cardSize: CardSizes['12col']}) ?? {}

  return <DzCardMolecule {...{...mappedData, ...overrideData}} />
}

export default DzCard
