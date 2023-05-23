import {DzColumn, DzComplexGrid, DzTitle, TITLE_SIZES, TITLE_TYPES} from '@zwirner/design-system'
import {FC} from 'react'

import styles from './availableArtworks.module.css'
import {mapCardsGrid} from './mapper'

interface AvailableArtworksProps {
  data: any
}

export const AvailableArtworksContainer: FC<AvailableArtworksProps> = ({data}) => {
  const {artworks, displayNumberOfResults, title} = data ?? {}
  const complexGridCard = mapCardsGrid(artworks)
  return (
    <DzColumn span={12}>
      <div className={styles.pageContainer}>
        <DzTitle
          titleType={TITLE_TYPES.H1}
          classNameTitle={styles.mainTitle}
          title={title}
          titleSize={TITLE_SIZES.XL}
        />
        <DzComplexGrid displayNumberOfResults={displayNumberOfResults} cards={complexGridCard} />
      </div>
    </DzColumn>
  )
}
