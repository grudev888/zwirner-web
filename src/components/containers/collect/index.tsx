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
  DzTitle,
  DzTitleMolecule,
  TITLE_SIZES,
  TITLE_TYPES,
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

const TITLE_MOLECULE_PROPS = {
  titleType: TITLE_TYPES.H3,
  titleSize: TITLE_SIZES.LG,
  subtitleSize: TITLE_SIZES.LG,
  subtitleType: TITLE_TYPES.H3,
  classNameTitle: styles.titleSection,
}

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
  const platformData = platformInterstitialMap(platformInterstitial)
  const interstitialData = interstitialMap(interstitial)

  const renderCarousel = (data: any) => (
    <DzColumn span={12} className={styles.fullSection}>
      <DzCarousel slidesPerViewDesktop={2}>
        {data?.map((card: any) => (
          <div className="w-full" key={card.id}>
            <DzCard data={card} type={CARD_TYPES.CONTENT} />
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
      <div className={styles.collectContainer}>
        <DzHero items={[heroData]} />
        <div className={styles.sectionWithTitleMolecule}>
          <DzTitleMolecule
            title="Online Exhibitions"
            linkCTA={{
              text: 'View All',
              linkElement: 'a',
              url: '/',
            }}
            titleProps={{
              ...TITLE_MOLECULE_PROPS,
              title: 'Online Exhibitions',
            }}
          />
          {exhibitionsCarousel ? renderCarousel(exhibitionsCarousel) : null}
        </div>
        <div className={styles.sectionWithTitleMolecule}>
          <DzTitleMolecule
            title="Upcoming Fairs"
            linkCTA={{
              text: 'View All',
              linkElement: 'a',
              url: '/',
            }}
            titleProps={{
              ...TITLE_MOLECULE_PROPS,
              title: 'Upcoming Fairs',
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
        <div className={styles.fullSection}>
          <DzInterstitial {...platformData} />
        </div>
        <DzInterstitial {...interstitialData} />
        <div className={styles.spacer}></div>
      </div>
    </DzColumn>
  )
}
