import {
  CARD_TYPES,
  DzCard,
  DzCarousel,
  DzColumn,
  DzComplexGrid,
  DzInterstitial,
  DzMedia,
  DzText,
  DzTitle,
  TITLE_TYPES,
} from '@zwirner/design-system'
import {FC} from 'react'

import {
  artworksGridMap,
  cardSectionMap,
  interstitialMap,
  interstitialNewReleasesMap,
  mapCarouselCards,
  utopiaMainMediaMap,
} from './mapper'
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
  const mediaProps = utopiaMainMediaMap(media)
  const interstitialProps = interstitialNewReleasesMap(newReleasesInterstitial)
  const nowAvailableData = cardSectionMap(nowAvailable)
  const comingSoonData = cardSectionMap(comingSoon)
  const artworksData = artworksGridMap(artworksGrid)
  const interstitialData = interstitialMap(interstitial)
  const carouselCards = mapCarouselCards(mediaCarousel)

  const renderCarousel = (data: any) => (
    <DzColumn span={12} className={styles.fullSection}>
      <DzCarousel slidesPerViewDesktop={1}>
        {data?.map((card: any) => (
          <div className="w-full md:w-[calc(100vw_-_16.125rem)]" key={card.id}>
            <DzCard data={card} type={CARD_TYPES.MEDIA} />
          </div>
        ))}
      </DzCarousel>
    </DzColumn>
  )
  return (
    <DzColumn span={12}>
      <DzTitle
        title={title}
        titleType={TITLE_TYPES.H1}
        classNameTitle={styles.pageTitle}
        className={styles.pageTitleContainer}
      />
      <div className={styles.pageContainer}>
        <DzMedia imgClass={styles.mediaImage} {...mediaProps} />
        <DzInterstitial data={{...interstitialProps, customTitleClass: styles.interstitialTitle}} />
        <div className={styles.cardSection}>
          <DzText text={nowAvailableData.title} className={styles.cardSectionTitle} />
          <DzCard {...nowAvailableData.card} />
        </div>
        <div className={styles.cardSection}>
          <DzText text={comingSoonData.title} className={styles.cardSectionTitle} />
          <DzCard {...comingSoonData.card} />
        </div>
        <DzComplexGrid
          textProps={{text: artworksGrid.Text, className: styles.textGrid}}
          {...artworksData}
        />
        <DzInterstitial {...interstitialData} />
        {carouselCards ? renderCarousel(carouselCards) : null}
        <div className={styles.spacer}></div>
      </div>
    </DzColumn>
  )
}
