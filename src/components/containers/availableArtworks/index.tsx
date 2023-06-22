import {FC} from 'react'
import {DzColumn, DzComplexGrid, TITLE_SIZES, TITLE_TYPES} from '@zwirner/design-system'

import {ContainerTitle} from '@/components/containers/title/ContainerTitle'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {mapCardsGrid} from './mapper'

interface AvailableArtworksProps {
  data: any
}

export const AvailableArtworksContainer: FC<AvailableArtworksProps> = ({data}) => {
  const {artworksGrid, displayNumberOfResults, title} = data ?? {}
  const {artworks = [], itemsPerRow = 1} = artworksGrid ?? {}
  const complexGridCard = mapCardsGrid(artworks)

  return (
    <DzColumn span={12}>
      <ContainerTitle
        title={title}
        titleSize={TITLE_SIZES.XL}
        titleType={TITLE_TYPES.H1}
      />
      <FullWidthFlexCol>
        <DzComplexGrid
          maxItemsPerRow={itemsPerRow}
          displayNumberOfResults={displayNumberOfResults}
          cards={complexGridCard}
        />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
