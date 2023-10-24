import {
  BUTTON_SIZES,
  CARD_TYPES,
  DzButton,
  DzCard,
  DzColumn,
  DzComplexGrid,
  DzImageZoomModal,
  DzText,
  DzTitle,
  LINK_VARIANTS,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'
import cn from 'classnames'
import Image from 'next/image'
import {useRef, useState} from 'react'

import {DzLink} from '@/components/wrappers/DzLinkWrapper'
import {DzPortableText} from '@/components/wrappers/DzPortableText'
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
  Object.entries(photoDimensionsMap).forEach(([key, dimensions]) => {
    photoGridImageStyleMap[key] = isImageZoomable(dimensions as any) ? 'cursor-zoom-in' : ''
  })
  const firstItemMediaProps = allPhotoGridItems[0]
  const descriptionRef = useRef<HTMLDivElement>(null)
  const detailTextStyles = {normal: 'text-black-60 !text-sm'}
  const {isSmall} = useBreakpoints()

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
    // TODO: add product information for cart (Ryan)
    // product,
  } = data

  const {artistName, artistSlug, displayTitle, primaryCta, secondaryCta} = mapArtworkData(data)
  const priceAndCurrency = price ? formatCurrency(currency || 'USD', price) : null
  const isFramedShown = artworkType !== 'sculpture' && (framed == 'Framed' || framed == 'Unframed')
  const isArtworkTitlePortableText = !!displayTitle
  const artworkTitle = isArtworkTitlePortableText ? displayTitle : title
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
              ImgElement={Image}
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
                  imageStyles={photoGridImageStyleMap[firstItemMediaProps.id] || ''}
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
                  ImgElement={Image}
                />
              </div>
            )}
            {framedDimensions && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: framedDimensions}}
                  customStyles={detailTextStyles}
                  builder={builder}
                  ImgElement={Image}
                />
              </div>
            )}
            {editionInformation && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: editionInformation}}
                  customStyles={detailTextStyles}
                  builder={builder}
                  ImgElement={Image}
                />
              </div>
            )}
            {productInformation && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: productInformation}}
                  customStyles={detailTextStyles}
                  builder={builder}
                  ImgElement={Image}
                />
              </div>
            )}
            {copyrightInformation && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: copyrightInformation}}
                  customStyles={detailTextStyles}
                  builder={builder}
                  ImgElement={Image}
                />
              </div>
            )}
            {additionalCaption && (
              <div className={styles.textSectionContainer}>
                <DzPortableText
                  portableProps={{value: additionalCaption}}
                  customStyles={detailTextStyles}
                  builder={builder}
                  ImgElement={Image}
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
            <DzPortableText
              portableProps={{value: description}}
              builder={builder}
              ImgElement={Image}
            />
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
