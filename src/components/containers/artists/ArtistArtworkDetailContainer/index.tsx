import {DzColumn, useBreakpoints} from '@zwirner/design-system'
import {
  BUTTON_SIZES,
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
} from '@zwirner/design-system'
import cn from 'classnames'
import {FC, useRef, useState} from 'react'

import DzPortableText from '@/common/components/portableText'

//import {photosGrid} from '@/components/containers/artworks/mapper'
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
  //const photoGridItems = photosGrid(data) || []
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
    medium,
    dimensions,
    price,
    currency,
    primaryCta,
    secondaryCta,
    description,
    productInformation,
    editionInformation,
    additionalCaption,
    salesInformation,
    year,
  } = mapArtworkData(data)
  const artworkTitleAndYear = `${title}${year ? `, ${year}` : ''}`
  const priceAndCurrency = price && currency ? `${currency} ${price}` : null

  return (
    <>
      <DzColumn span={4} className={cn(styles.leftPane)}>
        <div className={styles.leftPaneContent}>
          {isSmall && cardsData?.length ? (
            <DzMedia {...firstItemMediaProps} className={styles.singleMediaItem} />
          ) : undefined}
          <DzTitle
            titleType={TITLE_TYPES.H1}
            title={artistName}
            subtitle={artworkTitleAndYear}
            titleSize={TITLE_SIZES.MD}
            subtitleSize={TITLE_SIZES.MD}
            classNameSubtitle={styles.subtitle}
            className={styles.header}
          />
          <DzText text={medium} textSize={TEXT_SIZES.SMALL} className={styles.artworkDetailText} />
          {dimensions && (
            <div className={styles.dimensionsContainer}>
              <DzPortableText portableProps={{value: dimensions}} />
            </div>
          )}
          {editionInformation && <DzPortableText portableProps={{value: editionInformation}} />}
          {productInformation && <DzPortableText portableProps={{value: productInformation}} />}
          {additionalCaption && <DzPortableText portableProps={{value: additionalCaption}} />}
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
        {primaryCta && (
          <div className={styles.ctaContainer}>
            <div className={styles.ctaContainerTop} />
            <div className={styles.ctaBody}>
              {salesInformation && <DzPortableText portableProps={{value: salesInformation}} />}
              {priceAndCurrency && (
                <DzText text={priceAndCurrency} className={styles.priceAndCurrency} />
              )}
              {primaryCta ? (
                <DzButton className={cn(styles.btnCTA)} size={BUTTON_SIZES.LARGE}>
                  {primaryCta.text}
                </DzButton>
              ) : null}
              {secondaryCta ? (
                <DzButton
                  className={cn(styles.btnCTA, styles.btnCTASecondary)}
                  size={BUTTON_SIZES.LARGE}
                >
                  {secondaryCta.text}
                </DzButton>
              ) : null}
            </div>
          </div>
        )}
      </DzColumn>
      <DzColumn span={8} className={cn(styles.rightPane)}>
        <DzComplexGrid
          cards={cardsData}
          maxItemsPerRow={1}
          onClickImage={onClickImage}
          imageStyles={gridImageStyles.cursorZoom}
          gridColumnsStyles="!gap-y-[1rem]"
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
