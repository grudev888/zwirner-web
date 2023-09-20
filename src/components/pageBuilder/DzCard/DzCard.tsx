import {CardSizes} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {DzCardExtendedProps} from '@/sanity/types'

import {contentTypesMapper, dzCardOverrides} from './cardMapper'

const DzCardMolecule = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzCard), {
  ssr: false,
})

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
