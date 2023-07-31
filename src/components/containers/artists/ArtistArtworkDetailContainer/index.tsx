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
} from '@zwirner/design-system'
import cn from 'classnames'
import {FC, useRef, useState} from 'react'

import DzPortableText from '@/common/components/portableText'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

import styles from './artistArtworkDetailContainer.module.css'
import {mapArtworkData} from './mapper'
import {cardsData} from './mocks'

interface ArtistArtworkDetailContainerProps {
  data: any
}

// TODO externalize this to layouts/header.tsx
const HEADER_HEIGHT = '60px'

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
  const {artistName, title, edition, medium, dimensions, description, year} = mapArtworkData(data)
  const artworkTitleAndYear = `${title}${year ? `, ${year}` : ''}`

  return (
    <DzColumn span={12}>
      <FullWidthFlexCol>
        <div className={styles.container}>
          <div
            className={cn(styles.leftPane)}
            style={
              isSmall
                ? {}
                : {
                    // TODO locate styles in styles.leftPane, currently not working there
                    height: `calc(100vh - ${HEADER_HEIGHT})`,
                    top: HEADER_HEIGHT,
                  }
            }
          >
            {isSmall && cardsData?.length ? <DzMedia {...firstItemMediaProps} /> : undefined}
            <DzTitle
              titleType={TITLE_TYPES.H1}
              title={artistName}
              subtitle={artworkTitleAndYear}
              titleSize={TITLE_SIZES.MD}
              subtitleSize={TITLE_SIZES.MD}
              classNameSubtitle={styles.subtitle}
            />
            <DzText
              text={medium}
              textSize={TEXT_SIZES.SMALL}
              className={styles.artworkDetailText}
            />
            {dimensions && <DzPortableText portableProps={{value: dimensions}} />}
            <DzText
              text={edition}
              textSize={TEXT_SIZES.SMALL}
              className={styles.artworkDetailText}
            />
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
            <div className={styles.ctaContainer}>
              <div className={styles.ctaContainerTop} />
              <div className={styles.ctaBody}>
                <div>This is CTA Text</div>
                <DzButton className={styles.ctaButton}>Primary CTA</DzButton>
                <DzButton className={styles.ctaButton}>Tertiary CTA</DzButton>
              </div>
            </div>
          </div>
          {gridItems ? (
            <div className={cn(styles.rightPane)}>
              <DzComplexGrid
                cards={gridItems}
                maxItemsPerRow={1}
                onClickImage={onClickImage}
                imageStyles={gridImageStyles.cursorZoom}
              />
              {description && (
                <div ref={descriptionRef}>
                  <DzPortableText portableProps={{value: description}} />
                </div>
              )}
            </div>
          ) : null}
        </div>
        <DzImageZoomModal
          imgUrl={currentZoomedUrl}
          onClose={() => setCurrentZoomedUrl(undefined)}
          isOpen={!!currentZoomedUrl}
        />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
