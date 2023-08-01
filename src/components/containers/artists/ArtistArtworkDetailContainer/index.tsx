import {DzColumn, useBreakpoints} from '@zwirner/design-system'
import {
  DzButton,
  DzComplexGrid,
  DzImageZoomModal,
  DzLink,
  DzMedia,
  DzText,
  DzTitle,
  LINK_VARIANTS,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
  BUTTON_SIZES,
} from '@zwirner/design-system'
import cn from 'classnames'
import {FC, useRef, useState} from 'react'

import DzPortableText from '@/common/components/portableText'

import styles from './artistArtworkDetailContainer.module.css'
import {mapArtworkData} from './mapper'
import {cardsData} from './mocks'

interface ArtistArtworkDetailContainerProps {
  data: any
}

// TODO relocate
const gridImageStyles: any = {
  cursorZoom: 'cursor-zoom-in',
}

export const ArtistArtworkDetailContainer: FC<ArtistArtworkDetailContainerProps> = ({data}) => {
  const {isSmall} = useBreakpoints()
  const [currentZoomedUrl, setCurrentZoomedUrl] = useState<string | undefined>(undefined)
  const gridItems = isSmall ? cardsData.slice(1) : cardsData
  const descriptionRef = useRef<HTMLDivElement>(null)
  const onClickImage = (data: any) => {
    const src = data?.media?.imgProps?.src
    if (src) {
      setCurrentZoomedUrl(src)
    }
  }
  const onClickLearnMore = () => {
    if (descriptionRef.current) {
      setTimeout(() => window.scrollTo(0, descriptionRef?.current?.offsetTop || 0), 10)
    }
  }
  const firstItemMediaProps = {
    ...cardsData[0].media,
    imgProps: {
      ...cardsData[0].media.imgProps,
      onClick: () => onClickImage(cardsData[0]),
    },
  }
  const {
    artistName,
    title,
    edition,
    medium,
    dimensions,
    price,
    currency,
    primaryCta,
    secondaryCta,
    description,
    year,
  } = mapArtworkData(data)
  const artworkTitleAndYear = `${title}${year ? `, ${year}` : ''}`
  const priceAndCurrency = `${currency ? `${currency} ` : ''}${price ? price : ''}`

  return (
    <>
      <DzColumn span={4} className={cn(styles.leftPane)}>
        <div className={styles.leftPaneContent}>
          {isSmall && cardsData?.length ? <DzMedia {...firstItemMediaProps} /> : undefined}
          <DzTitle
            titleType={TITLE_TYPES.H1}
            title={artistName}
            subtitle={artworkTitleAndYear}
            titleSize={TITLE_SIZES.MD}
            subtitleSize={TITLE_SIZES.MD}
            classNameSubtitle={styles.subtitle}
          />
          <DzText text={medium} textSize={TEXT_SIZES.SMALL} className={styles.artworkDetailText} />
          {dimensions && <DzPortableText portableProps={{value: dimensions}} />}
          <DzText text={edition} textSize={TEXT_SIZES.SMALL} className={styles.artworkDetailText} />
          {description && (
            <DzLink
              href="#"
              id="description"
              onClick={onClickLearnMore}
              variant={LINK_VARIANTS.TEXT}
              className={styles.learnMore}
            >
              Learn More
            </DzLink>
          )}
        </div>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContainerTop} />
          <div className={styles.ctaBody}>
            <DzText text={priceAndCurrency} />
            {primaryCta ? (
              <DzButton className={cn(styles.btnCTA)} size={BUTTON_SIZES.LARGE}>
                {primaryCta.text}
              </DzButton>
            ) : null}
            {secondaryCta ? (
              <DzButton className={cn(styles.btnCTA)} size={BUTTON_SIZES.LARGE}>
                {secondaryCta.text}
              </DzButton>
            ) : null}
          </div>
        </div>
      </DzColumn>
      <DzColumn span={8} className={cn(styles.rightPane)}>
        <DzComplexGrid
          cards={gridItems || []}
          maxItemsPerRow={1}
          onClickImage={onClickImage}
          imageStyles={gridImageStyles.cursorZoom}
        />
        {description && (
          <div ref={descriptionRef}>
            <DzPortableText portableProps={{value: description}} />
          </div>
        )}
      </DzColumn>
      <DzImageZoomModal
        imgUrl={currentZoomedUrl}
        onClose={() => setCurrentZoomedUrl(undefined)}
        isOpen={!!currentZoomedUrl}
      />
    </>
  )
}
