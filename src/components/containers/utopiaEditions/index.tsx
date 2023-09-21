import {
  CARD_TYPES,
  CardSizes,
  DzCard,
  DzCarouselCardSize,
  DzColumn,
  DzHero,
  DzInterstitial,
  DzMedia,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  TITLE_TYPES,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {
  artworksGridMap,
  heroMap,
  interstitialNewReleasesMap,
  mapCarouselCards,
  utopiaMainMediaMap,
} from './mapper'
import styles from './utopia.module.css'

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {ssr: false}
)

const DzCarousel = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzCarousel), {
  ssr: false,
})

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
  const interstitialData = dzInterstitialOverrides(interstitial)
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
