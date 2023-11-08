import {
  BUTTON_SIZES,
  CARD_TYPES,
  DzButton,
  DzColumn,
  DzImageZoomModal,
  DzText,
  DzTitle,
  LINK_VARIANTS,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
  useIsSmallWindowSize,
} from '@zwirner/design-system'
import cn from 'classnames'
import {useRef, useState} from 'react'

import {CTA, CTA_TEXT} from '@/common/constants/cart'
import {ARTWORK_BG_COLORS_TO_TW_VALUES} from '@/components/pageBuilder/DzCard/cardMapper'
import {DzCard} from '@/components/wrappers/DzCardWrapper'
import {DzComplexGrid} from '@/components/wrappers/DzComplexGridWrapper'
import {DzLink} from '@/components/wrappers/DzLinkWrapper'
import {DzPortableText} from '@/components/wrappers/DzPortableTextWrapper'
import {builder} from '@/sanity/imageBuilder'
import {ArtworkDataType} from '@/sanity/queries/artworks/artworkData'
import {formatCurrency} from '@/utils/currency/formatCurrency'

import styles from './index.module.css'
import {getImageDimensions, mapArtworkData, photosGrid} from './mapper'

type Props = {
  data: ArtworkDataType
}

const MINIMUM_ZOOMABLE_IMAGE_SIZE = 2560

export const isImageZoomable = (dimensions: {width: number; height: number}) => {
  const {width, height} = dimensions || {}
  return width >= MINIMUM_ZOOMABLE_IMAGE_SIZE || height >= MINIMUM_ZOOMABLE_IMAGE_SIZE
}

export const ArtworkContainer = ({data}: Props) => {
  const [currentZoomedImgProps, setCurrentZoomedImgProps] = useState<
    Record<string, any> | undefined
  >(undefined)
  const allPhotoGridItems = photosGrid(data) || []
  const photoDimensionsMap = getImageDimensions(data)
  const photoGridImageStyleMap: Record<string, string> = {}
  const firstItemMediaProps = allPhotoGridItems[0]
  const descriptionRef = useRef<HTMLDivElement>(null)
  const detailTextStyles = {normal: 'text-black-60 !text-sm'}
  const isSmall = useIsSmallWindowSize()

  const onClickPhotoCard = (cardData: any) => {
    if (photoGridImageStyleMap[cardData.id]) {
      const imgProps: Record<string, any> = cardData?.media?.imgProps
      const {width, height} = photoDimensionsMap[imgProps.src] ?? {}
      setCurrentZoomedImgProps({...imgProps, width, height})
    }
  }

  const onClickLearnMore = () => {
    if (descriptionRef.current) {
      setTimeout(() => window.scrollTo(0, descriptionRef?.current?.offsetTop || 0), 10)
    }
  }

  const {
    artworkType,
    backgroundColor,
    editionInformation,
    title,
    medium,
    dimensions,
    displayDate,
    price,
    description,
    currency,
    salesInformation,
    productInformation,
    copyrightInformation,
    framed,
    framedDimensions,
    additionalCaption,
    dateSelection: {year},
    artworkCTA,
    product,
  } = data

  const {artistName, artistSlug, displayTitle, secondaryCta} = mapArtworkData(data)
  const imageBgColor = backgroundColor ? ARTWORK_BG_COLORS_TO_TW_VALUES[backgroundColor] : ''
  const priceAndCurrency = price ? formatCurrency(currency || 'USD', price) : null
  const isFramedShown = artworkType !== 'sculpture' && (framed == 'Framed' || framed == 'Unframed')
  const isArtworkTitlePortableText = !!displayTitle
  const artworkTitle = isArtworkTitlePortableText ? displayTitle : title

  Object.entries(photoDimensionsMap).forEach(([key, dimensions]) => {
    const zoomStyle = isImageZoomable(dimensions as any) ? 'cursor-zoom-in' : ''
    const bgStyle = imageBgColor || ''

    photoGridImageStyleMap[key] = `${zoomStyle} ${bgStyle}`
  })

  const ctaContainer = (
    <div className={styles.ctaContainer}>
      <div className={styles.ctaContainerTop} />
      <div className={styles.ctaBody}>
        {salesInformation && (
          <div className={styles.textSectionContainer}>
            <DzPortableText
              portableProps={{value: salesInformation}}
              customStyles={{normal: '!text-sm'}}
              builder={builder}
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
          {!!product && artworkCTA?.CTA === CTA.ECOMM && (
            <DzButton
              className={styles.btnCTA}
              size={BUTTON_SIZES.LARGE}
              onClick={() => {}}
              disabled={!product.variants[0].store.inventory.isAvailable}
            >
              {!product.variants[0].store.inventory.isAvailable
                ? CTA_TEXT.SOLD_OUT
                : artworkCTA?.CTAText || CTA_TEXT.PURCHASE}
            </DzButton>
          )}
          {artworkCTA?.CTA === CTA.SOLDOUT && (
            <DzButton className={styles.btnCTA} size={BUTTON_SIZES.LARGE} disabled>
              {artworkCTA?.CTAText || CTA_TEXT.SOLD_OUT}
            </DzButton>
          )}
          {artworkCTA?.CTA === CTA.INQUIRE && (
            <DzButton className={styles.btnCTA} size={BUTTON_SIZES.LARGE}>
              {artworkCTA?.CTAText || CTA_TEXT.INQUIRE}
            </DzButton>
          )}
          {artworkCTA?.CTA === CTA.CUSTOM && (
            <DzButton className={styles.btnCTA} size={BUTTON_SIZES.LARGE}>
              {artworkCTA?.CTAText || CTA_TEXT.CUSTOM}
            </DzButton>
          )}
          {secondaryCta && (
            <DzButton
              className={cn(styles.btnCTA, styles.btnCTASecondary)}
              size={BUTTON_SIZES.LARGE}
            >
              {secondaryCta.text}
            </DzButton>
          )}
        </div>
      </div>
    </div>
  )
  // TODO: add product information for cart

  return (
    <>
      <DzColumn span={4} className={cn(styles.leftColumn)}>
        <div className={cn(styles.leftPane)}>
          <div className={styles.leftPaneContent}>
            {!!firstItemMediaProps && (
              <div className="md:hidden">
                <DzCard
                  type={CARD_TYPES.ARTWORK}
                  data={firstItemMediaProps}
                  onClickImage={onClickPhotoCard}
                  imageStyles={cn(
                    photoGridImageStyleMap[firstItemMediaProps.id] || '',
                    imageBgColor
                  )}
                />
              </div>
            )}
            <DzTitle
              titleType={TITLE_TYPES.H1}
              title={
                <>
                  {artistSlug ? (
                    <>
                      <DzLink href={artistSlug} textLinkSize={TEXT_SIZES.MEDIUM}>
                        {artistName}
                      </DzLink>
                      &nbsp; {/* non breaking space added here for SEO purpose in H1 */}
                    </>
                  ) : (
                    artistName
                  )}
                  {artworkTitle && (year || displayDate) && (
                    <div>
                      <span className={isArtworkTitlePortableText ? '' : styles.subtitle}>
                        {artworkTitle},{' '}
                      </span>
                      <span className={styles.subtitleYear}>{displayDate || year}</span>
                    </div>
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
                  builder={builder}
                />
              </div>
            )}
            {framedDimensions && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: framedDimensions}}
                  customStyles={detailTextStyles}
                  builder={builder}
                />
              </div>
            )}
            {editionInformation && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: editionInformation}}
                  customStyles={detailTextStyles}
                  builder={builder}
                />
              </div>
            )}
            {productInformation && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: productInformation}}
                  customStyles={detailTextStyles}
                  builder={builder}
                />
              </div>
            )}
            {copyrightInformation && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: copyrightInformation}}
                  customStyles={detailTextStyles}
                  builder={builder}
                />
              </div>
            )}
            {additionalCaption && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: additionalCaption}}
                  customStyles={detailTextStyles}
                  builder={builder}
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
          {!isSmall && ctaContainer}
        </div>
      </DzColumn>
      <DzColumn span={8} className={cn(styles.rightPane)}>
        <DzComplexGrid
          cards={allPhotoGridItems}
          maxItemsPerRow={1}
          onClickImage={onClickPhotoCard}
          cardStylesMap={photoGridImageStyleMap}
          gridColumnsStyles="!gap-y-[1rem]"
        />
        {description && (
          <div ref={descriptionRef} className={styles.descriptionContainer}>
            <DzPortableText portableProps={{value: description}} builder={builder} />
          </div>
        )}
      </DzColumn>
      {isSmall && ctaContainer}
      <DzImageZoomModal
        alt={currentZoomedImgProps?.alt || 'Zoomed artwork image'}
        imgUrl={currentZoomedImgProps?.src}
        onClose={() => setCurrentZoomedImgProps(undefined)}
        isOpen={!!currentZoomedImgProps?.src}
      />
    </>
  )
}
