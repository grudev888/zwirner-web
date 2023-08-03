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
import {FC, useEffect, useRef, useState} from 'react'

import DzPortableText from '@/common/components/portableText'
import {photosGrid} from '@/components/containers/artworks/mapper'

import styles from './artistArtworkDetailContainer.module.css'
import {mapArtworkData} from './mapper'

interface ArtistArtworkDetailContainerProps {
  data: any
}

// TODO relocate
const gridImageStyles: any = {
  cursorZoom: 'cursor-zoom-in',
}

export const ArtistArtworkDetailContainer: FC<ArtistArtworkDetailContainerProps> = ({data}) => {
  const [isClient, setIsClient] = useState(false)
  const {isSmall} = useBreakpoints()
  const [currentZoomedUrl, setCurrentZoomedUrl] = useState<string | undefined>(undefined)
  const photoGridItems = photosGrid(data) || []
  const descriptionRef = useRef<HTMLDivElement>(null)
  const detailTextStyles = {normal: 'text-black-60 !text-sm'}

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
  const firstItemMediaProps = photoGridItems?.[0]
    ? {
        ...photoGridItems[0].media,
        imgProps: {
          ...photoGridItems[0].media.imgProps,
          onClick: () => onClickImage(photoGridItems[0]),
        },
      }
    : null

  const {
    artistName,
    artistSlug,
    title,
    medium,
    price,
    currency,
    primaryCta,
    secondaryCta,
    framed,
    description,
    productInformation,
    editionInformation,
    framedDimensions,
    additionalCaption,
    salesInformation,
    year,
  } = mapArtworkData(data)
  const priceAndCurrency = price && currency ? `${currency} ${price}` : null

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <DzColumn span={4} className={cn(styles.leftPane)}>
        <div className={styles.leftPaneContent}>
          {isClient && isSmall && firstItemMediaProps ? (
            <DzMedia
              {...firstItemMediaProps}
              className={styles.singleMediaItem}
              suppressHydrationWarning
            />
          ) : null}
          <DzTitle
            titleType={TITLE_TYPES.H1}
            title={
              artistSlug ? (
                <DzLink href={artistSlug} textLinkSize={TEXT_SIZES.MEDIUM}>
                  {artistName}
                </DzLink>
              ) : (
                artistName
              )
            }
            subtitle={
              title &&
              year && (
                <>
                  <span className={styles.subtitle}>{title}, </span>
                  <span className={styles.subtitleYear}>{year}</span>
                </>
              )
            }
            titleSize={TITLE_SIZES.MD}
            subtitleSize={TITLE_SIZES.MD}
            className={styles.header}
          />
          <DzText text={medium} textSize={TEXT_SIZES.SMALL} className={styles.artworkDetailText} />
          {framedDimensions && (
            <div className={styles.textSectionContainer}>
              <DzPortableText
                portableProps={{value: framedDimensions}}
                customStyles={detailTextStyles}
              />
            </div>
          )}
          {editionInformation && (
            <div className={styles.textSectionContainer}>
              <DzPortableText
                portableProps={{value: editionInformation}}
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
        {primaryCta && (
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
              {priceAndCurrency && (
                <DzText text={priceAndCurrency} className={styles.priceAndCurrency} />
              )}
              {framed && <DzText text={framed} className={styles.framed} />}
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
          cards={photoGridItems}
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
