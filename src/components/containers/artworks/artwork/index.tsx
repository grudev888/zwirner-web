import {
  BUTTON_SIZES,
  CARD_TYPES,
  DzButton,
  DzCard,
  DzColumn,
  DzComplexGrid,
  DzImageZoomModal,
  DzLink,
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

import {DzPortableText} from '@/components/wrappers/DzPortableText'
import {builder} from '@/sanity/imageBuilder'
import {ArtworkDataType} from '@/sanity/queries/artworks/artworkData'

import styles from './index.module.css'
import {mapArtworkData, photosGrid} from './mapper'

type Props = {
  data: ArtworkDataType
}

// TODO relocate
const gridImageStyles: any = {
  cursorZoom: 'cursor-zoom-in',
}

export const ArtworkContainer = ({data}: Props) => {
  const [currentZoomedImgProps, setCurrentZoomedImgProps] = useState<
    Record<string, any> | undefined
  >(undefined)
  const allPhotoGridItems = photosGrid(data) || []
  const firstItemMediaProps = allPhotoGridItems[0]
  const descriptionRef = useRef<HTMLDivElement>(null)
  const detailTextStyles = {normal: 'text-black-60 !text-sm'}
  const {isSmall} = useBreakpoints()

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
    product,
  } = data

  const {artistName, artistSlug, primaryCta, secondaryCta} = mapArtworkData(data)
  const priceAndCurrency = price && currency ? `${currency} ${price}` : null
  const isFramedShown = artworkType !== 'sculpture' && (framed == 'Framed' || framed == 'Unframed')

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
  console.log('product', product)
  // TODO: add product information for cart

  return (
    <>
      <DzColumn span={4}>
        <div className={cn(styles.leftPane)}>
          <div className={styles.leftPaneContent}>
            {!!firstItemMediaProps && (
              <div className="md:hidden">
                <DzCard
                  type={CARD_TYPES.ARTWORK}
                  data={firstItemMediaProps}
                  onClickImage={onClickImage}
                  imageStyles={gridImageStyles.cursorZoom}
                />
              </div>
            )}
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
                    <div>
                      <span className={styles.subtitle}>{title}, </span>
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
          onClickImage={onClickImage}
          imageStyles={gridImageStyles.cursorZoom}
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
