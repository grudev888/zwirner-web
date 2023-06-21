import {DzColumn, DzComplexGrid, DzTitle, TITLE_SIZES, TITLE_TYPES} from '@zwirner/design-system'
import {FC} from 'react'

import styles from './availableArtworks.module.css'
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
      <FullWidthFlexCol className={styles.pageContainer}>
        <DzTitle
          titleType={TITLE_TYPES.H1}
          classNameTitle={styles.mainTitle}
          title={title}
          titleSize={TITLE_SIZES.XL}
        />
        <DzComplexGrid
          maxItemsPerRow={itemsPerRow}
          displayNumberOfResults={displayNumberOfResults}
          cards={complexGridCard}
        />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
