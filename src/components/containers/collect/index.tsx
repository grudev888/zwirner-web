import {
  CARD_TYPES,
  DzCard,
  DzCarousel,
  DzColumn,
  DzComplexGrid,
  DzEditorial,
  DzForm,
  DzHero,
  DzInterstitial,
  DzSplit,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
} from '@zwirner/design-system'
import {FC} from 'react'

import styles from './collect.module.css'
import {
  artworksGridMap,
  consignmentsMap,
  exhibitionCarouselMapper,
  heroMapper,
  interstitialMap,
  platformInterstitialMap,
  utopiaFeatureMap,
} from './mapper'

interface CollectContainerProps {
  data: any
}

const UPCOMING_FAIRS = '/fairs'
const ONLINE_EXHIBITIONS_URL = '/exhibitions'

export const CollectContainer: FC<CollectContainerProps> = ({data}) => {
  const {
    title,
    hero,
    exhibitions,
    fairs,
    featuredArtworks,
    consignmentsFeature,
    utopiaFeature,
    platformInterstitial,
    interstitial,
  } = data

  const heroData = heroMapper(hero)
  const exhibitionsCarousel = exhibitionCarouselMapper(exhibitions)
  const fairsCarousel = exhibitionCarouselMapper(fairs)
  const artworksData = artworksGridMap(featuredArtworks)
  const formProps = consignmentsMap(consignmentsFeature)
  const utopiaSplitData = utopiaFeatureMap(utopiaFeature)
  const platformData = platformInterstitialMap(platformInterstitial, styles.interstitial)
  const interstitialData = interstitialMap(interstitial)

  const renderCarousel = (data: any) => (
    <DzColumn span={12} className={styles.fullSection}>
      <DzCarousel>
        {data?.map((card: any) => (
          <div className="w-full" key={card.id}>
            <DzCard data={card} type={CARD_TYPES.CONTENT} />
          </div>
        ))}
      </DzCarousel>
    </DzColumn>
  )

  return (
    <>
      <DzColumn span={12}>
        <DzTitleMolecule
          type={DzTitleMoleculeTypes.PAGE}
          data={{title, customClass: styles.titleSpacing}}
        />
        <div className={styles.collectContainer}>
          <DzHero items={[heroData]} />
          <div className={styles.sectionWithTitleMolecule}>
            <DzTitleMolecule
              type={DzTitleMoleculeTypes.MOLECULE}
              data={{
                title: 'Online Exhibitions',
                linkCTA: {
                  text: 'View All',
                  linkElement: 'a',
                  url: ONLINE_EXHIBITIONS_URL,
                },
              }}
            />
            {exhibitionsCarousel ? renderCarousel(exhibitionsCarousel) : null}
          </div>
          <div className={styles.sectionWithTitleMolecule}>
            <DzTitleMolecule
              type={DzTitleMoleculeTypes.MOLECULE}
              data={{
                title: 'Upcoming Fairs',
                linkCTA: {
                  text: 'View All',
                  linkElement: 'a',
                  url: UPCOMING_FAIRS,
                },
              }}
            />
            {fairsCarousel ? renderCarousel(fairsCarousel) : null}
          </div>
          <DzComplexGrid
            textProps={{text: 'Featured Available Works', className: styles.textGrid}}
            {...artworksData}
          />
          <div className={styles.consignmentsSection}>
            <DzEditorial {...formProps.editorial} />
            <DzForm {...formProps.form} onSubmit={() => null} />
          </div>
          <DzSplit {...utopiaSplitData} />

          <div className="-ml-5 w-full">
            <DzInterstitial {...platformData} />
          </div>

          <div className="-ml-5 w-full">
            <DzInterstitial {...interstitialData} />
          </div>
          <div></div>
        </div>
      </DzColumn>
    </>
  )
}
