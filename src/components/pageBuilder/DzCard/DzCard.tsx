import {CardSizes, useBreakpoints} from '@zwirner/design-system'
import dynamic from 'next/dynamic'

import useEcommActions from '@/components/hooks/useEcommActions'
import {DzCardExtendedProps} from '@/sanity/types'

import {contentTypesMapper, dzCardOverrides} from './cardMapper'

const DzCardMolecule = dynamic(
  () => import('@/components/wrappers/DzCardWrapper').then((mod) => mod.DzCard),
  {ssr: false}
)

type DzCardProps = {
  data: any
  componentProps: DzCardExtendedProps
}

export const processDzCardData = ({
  data,
  componentProps,
  isSmall = false,
}: DzCardProps & {isSmall?: boolean}) => {
  const {_type} = data ?? {}
  const cardSize = componentProps?.cardSize ?? CardSizes['12col']

  const mappedData =
    (contentTypesMapper[_type] ?? ((a: any) => a))(data, {
      ...(componentProps ?? {}),
      cardSize,
      isSmall,
    }) ?? {}
  const overrideData = dzCardOverrides({...(componentProps ?? {}), cardSize, isSmall}) ?? {}

  return {...mappedData, ...overrideData}
}

export const DzCard = ({data, componentProps}: DzCardProps) => {
  const {handleLineAdd} = useEcommActions()
  const {isSmall} = useBreakpoints()
  return (
    <DzCardMolecule
      {...processDzCardData({
        data: {...data},
        componentProps: {...componentProps, handleLineAdd},
        isSmall,
      })}
    />
  )
}
