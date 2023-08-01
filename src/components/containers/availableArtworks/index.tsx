import {DzColumn, TITLE_SIZES} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {mapCardsGrid} from './mapper'

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {ssr: false}
)

interface AvailableArtworksProps {
  data: any
}

export const AvailableArtworksContainer: FC<AvailableArtworksProps> = ({data}) => {
  const {artworksGrid, title} = data ?? {}
  const {items = [], displayNumberOfResults, itemsPerRow = 1} = artworksGrid ?? {}
  const complexGridCard = mapCardsGrid(items)

  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />
      <FullWidthFlexCol>
        <DzComplexGrid
          maxItemsPerRow={itemsPerRow}
          displayNumberOfResults={!!displayNumberOfResults}
          cards={complexGridCard}
        />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
