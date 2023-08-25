import {CARD_TYPES, DzColumn, useAppBodyHeight, useBreakpoints} from '@zwirner/design-system'
import {
  BUTTON_SIZES,
  DzButton,
  DzCard,
  DzComplexGrid,
  DzImageZoomModal,
  DzLink,
  DzText,
  DzTitle,
  LINK_VARIANTS,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
} from '@zwirner/design-system'
import cn from 'classnames'
import {useEffect, useRef, useState} from 'react'

import DzPortableText from '@/common/components/portableText'
import {photosGrid} from '@/components/containers/artworks/mapper'
import NoSSR from '@/components/wrappers/NoSSR'

import styles from './artistArtworkDetailContainer.module.css'
import {mapArtworkData} from './mapper'
import { ArtistArtworkBySlugType } from '@/sanity/services/artist.service'

type Props = {
  data: ArtistArtworkBySlugType
}

// TODO relocate
const gridImageStyles: any = {
  cursorZoom: 'cursor-zoom-in',
}

export const ArtistArtworkDetailContainer = ({data}: Props) => {
  const [isClient, setIsClient] = useState(false)
  const {isSmall} = useBreakpoints()
  const [currentZoomedImgProps, setCurrentZoomedImgProps] = useState<
    Record<string, any> | undefined
  >(undefined)
  const allPhotoGridItems = photosGrid(data) || []
  const firstItemMediaProps = allPhotoGridItems[0]
  const photoGridItems = isSmall ? allPhotoGridItems.slice(1) : allPhotoGridItems
  const descriptionRef = useRef<HTMLDivElement>(null)
  const detailTextStyles = {normal: 'text-black-60 !text-sm'}

  const onClickImage = (data: any) => {
    const imgProps: Record<string, any> = data?.media?.imgProps
    if (imgProps) {
      setCurrentZoomedImgProps(imgProps)
    }
  }
  const onClickLearnMore = () => {
    if (descriptionRef.current) {
      setTimeout(() => window.scrollTo(0, descriptionRef?.current?.offsetTop || 0), 10)
    }
  }

  const {
    artistName,
    artistSlug,
    artworkType,
    title,
    displayDate,
    medium,
    price,
    currency,
    dimensions,
    primaryCta,
    secondaryCta,
    framed,
    description,
    productInformation,
    framedDimensions,
    additionalCaption,
    salesInformation,
    year,
  } = mapArtworkData(data)
  const priceAndCurrency = price && currency ? `${currency} ${price}` : null
  const leftPaneContainerHeight = useAppBodyHeight()
  const isFramedShown = framed && artworkType !== 'sculpture' && artworkType !== 'mixedMedia' && artworkType !== 'other';

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <DzColumn span={4}>
        <NoSSR>
          <div
            className={cn(styles.leftPane)}
            style={
              isSmall || !leftPaneContainerHeight ? {} : {height: `${leftPaneContainerHeight}px`}
            }
          >
            <div className={styles.leftPaneContent}>
              {isClient && isSmall && firstItemMediaProps ? (
                <DzCard
                  type={CARD_TYPES.ARTWORK}
                  data={firstItemMediaProps}
                  onClickImage={onClickImage}
                  imageStyles={gridImageStyles.cursorZoom}
                />
              ) : null}
              <DzTitle
                titleType={TITLE_TYPES.H1}
                title={
                  <>
                    {artistSlug ? (
                      <DzLink href={artistSlug} textLinkSize={TEXT_SIZES.MEDIUM}>
                        {artistName}
                      </DzLink>
                    ) : (
                      artistName
                    )}
                    {title && (year || displayDate) && (
                      <span className="block">
                        <span className={styles.subtitle}>{title}, </span>
                        <span className={styles.subtitleYear}>{displayDate || year}</span>
                      </span>
                    )}
                  </>
                }
                titleSize={TITLE_SIZES.MD}
                className={styles.header}
              />
              <DzText
                text={medium}
                textSize={TEXT_SIZES.SMALL}
                className={styles.artworkDetailText}
              />
              {dimensions && (
                <div className={styles.textSectionContainer}>
                  <DzPortableText
                    portableProps={{value: dimensions}}
                    customStyles={detailTextStyles}
                  />
                </div>
              )}
              {framedDimensions && (
                <div className={styles.textSectionContainer}>
                  <DzPortableText
                    portableProps={{value: framedDimensions}}
                    customStyles={detailTextStyles}
                  />
                </div>
              )}
              {productInformation && (
                <div className={styles.textSectionContainer}>
                  <DzPortableText
                    portableProps={{value: productInformation}}
                    customStyles={detailTextStyles}
                  />
                </div>
              )}
              {additionalCaption && (
                <div className={styles.textSectionContainer}>
                  <DzPortableText
                    portableProps={{value: additionalCaption}}
                    customStyles={detailTextStyles}
                  />
                </div>
              )}
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
                {salesInformation && (
                  <div className={styles.textSectionContainer}>
                    <DzPortableText
                      portableProps={{value: salesInformation}}
                      customStyles={{normal: '!text-sm'}}
                    />
                  </div>
                )}
                <div className={styles.priceAndFramingContainer}>
                  {priceAndCurrency && (
                    <DzText text={priceAndCurrency} className={styles.priceAndCurrency} />
                  )}
                  {isFramedShown && <DzText text={framed} className={styles.framed} />}
                </div>
                <div className={styles.ctaButtonsContainer}>
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
            </div>
          </div>
        </NoSSR>
      </DzColumn>
      <DzColumn span={8} className={cn(styles.rightPane)}>
        <DzComplexGrid
          cards={photoGridItems}
          maxItemsPerRow={1}
          onClickImage={onClickImage}
          imageStyles={gridImageStyles.cursorZoom}
          gridColumnsStyles="!gap-y-[1rem]"
        />
        {description && (
          <div ref={descriptionRef} className={styles.descriptionContainer}>
            <DzPortableText portableProps={{value: description}} />
          </div>
        )}
      </DzColumn>
      <DzImageZoomModal
        alt={currentZoomedImgProps?.alt || 'Zoomed artwork image'}
        imgUrl={currentZoomedImgProps?.src}
        onClose={() => setCurrentZoomedImgProps(undefined)}
        isOpen={!!currentZoomedImgProps?.src}
      />
    </>
  )
}
