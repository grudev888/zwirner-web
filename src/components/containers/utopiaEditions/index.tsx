import {FC} from 'react'
import {
  CARD_TYPES,
  DzCard,
  DzCarousel,
  DzColumn,
  DzComplexGrid,
  DzInterstitial,
  DzMedia,
  DzTitle,
  TEXT_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'

import {
  artworksGridMap,
  cardSectionMap,
  interstitialMap,
  interstitialNewReleasesMap,
  mapCarouselCards,
  utopiaMainMediaMap,
} from './mapper'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

import styles from './utopia.module.css'

interface UtopiaEditionsProps {
  data: any
}

export const UtopiaEditionsContainer: FC<UtopiaEditionsProps> = ({data}) => {
  const {
    title,
    media,
    newReleasesInterstitial,
    nowAvailable,
    comingSoon,
    artworksGrid,
    interstitial,
    mediaCarousel,
  } = data ?? {}
  const {isSmall} = useBreakpoints()

  const mediaProps = utopiaMainMediaMap(media)
  const interstitialProps = interstitialNewReleasesMap(newReleasesInterstitial)
  const nowAvailableData = cardSectionMap(nowAvailable)
  const comingSoonData = cardSectionMap(comingSoon)
  const artworksData = artworksGridMap(artworksGrid)
  const interstitialData = interstitialMap(interstitial)
  const carouselCards = mapCarouselCards(mediaCarousel)

  const renderCarousel = (data: any) => (
    <DzColumn span={12} className={styles.fullSection}>
      <DzCarousel slideSpanDesktop={10} slideSpanMobile={10}>
        {data?.map((card: any) => (
          <DzCard key={card.id} data={card} type={CARD_TYPES.MEDIA} />
        ))}
      </DzCarousel>
    </DzColumn>
  )
  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} titleType={TITLE_TYPES.H1} />
      <FullWidthFlexCol>
        <DzMedia imgClass={styles.mediaImage} {...mediaProps} />
        <DzInterstitial
          data={{
            ...interstitialProps,
            customDescriptionClass: styles.interstitialTitle,
            classNameContent: styles.interstitial,
          }}
        />
        <section className={styles.cardSection}>
          <DzTitle
            // Temporary fix to match text sizes with the design.
            // A set of rules will be created by the design team to remove this logic
            titleSize={isSmall ? TEXT_SIZES.MEDIUM : TEXT_SIZES.XL}
            titleType={TITLE_TYPES.H2}
            title={nowAvailableData.title}
          />
          <DzCard {...nowAvailableData.card} />
        </section>
        <section className={styles.cardSection}>
          <DzTitle
            titleSize={isSmall ? TEXT_SIZES.MEDIUM : TEXT_SIZES.XL}
            titleType={TITLE_TYPES.H2}
            title={comingSoonData.title}
          />
          <DzCard {...comingSoonData.card} />
        </section>
        <DzComplexGrid
          textProps={{text: artworksGrid.Title, className: styles.textGrid}}
          {...artworksData}
        />
        <DzInterstitial {...interstitialData} />
        {carouselCards ? renderCarousel(carouselCards) : null}
        <div className={styles.spacer}></div>
      </FullWidthFlexCol>
    </DzColumn>
  )
}
