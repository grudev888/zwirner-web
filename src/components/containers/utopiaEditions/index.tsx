import {
  CARD_TYPES,
  CardSizes,
  DzCard,
  DzCarousel,
  DzCarouselCardSize,
  DzColumn,
  DzComplexGrid,
  DzHero,
  DzInterstitial,
  DzMedia,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  TITLE_TYPES,
} from '@zwirner/design-system'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

import {
  artworksGridMap,
  heroMap,
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
  const nowAvailableData = heroMap(nowAvailable)
  const comingSoonData = heroMap(comingSoon)
  const artworksData = artworksGridMap(artworksGrid)
  const interstitialData = interstitialMap(interstitial)
  const carouselCards = mapCarouselCards(mediaCarousel)

  const renderCarousel = (data: any) => (
    <DzColumn span={12} className={styles.fullSection}>
      <DzCarousel size={DzCarouselCardSize.L}>
        {data?.map((card: any) => (
          <DzCard
            key={card.id}
            data={{...card, size: CardSizes['10col']}}
            type={CARD_TYPES.MEDIA}
          />
        ))}
      </DzCarousel>
    </DzColumn>
  )
  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} />
      <FullWidthFlexCol>
        <DzMedia imgClass={styles.mediaImage} {...mediaProps} />

        <section>
          <h2 className="sr-only">Get Alerts About New Releases</h2>
          <DzInterstitial
            data={{
              ...interstitialProps,
              customDescriptionClass: styles.interstitialTitle,
              classNameContent: styles.interstitial,
              customClass: styles.interstitialWrapper,
            }}
          />
        </section>

        <section className={styles.heroSection}>
          <DzTitleMolecule
            type={DzTitleMoleculeTypes.MOLECULE}
            data={{
              title: nowAvailable.title,
              titleProps: {titleType: TITLE_TYPES.H2},
            }}
          />
          <DzHero {...nowAvailableData} />
        </section>
        <section className={styles.heroSection}>
          <DzTitleMolecule
            type={DzTitleMoleculeTypes.MOLECULE}
            data={{
              title: comingSoon.title,
              titleProps: {titleType: TITLE_TYPES.H2},
            }}
          />
          <DzHero {...comingSoonData} />
        </section>

        <DzComplexGrid
          textProps={{text: artworksGrid.Title, className: styles.textGrid}}
          {...artworksData}
        />

        <section>
          <h2 className="sr-only">Sign Up</h2>
          <DzInterstitial {...interstitialData} />
        </section>

        {carouselCards ? (
          <section>
            <h2 className="sr-only">Highlights</h2>
            {renderCarousel(carouselCards)}
          </section>
        ) : null}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
