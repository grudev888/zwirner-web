import {
  CARD_TYPES,
  CardSizes,
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
  TITLE_TYPES,
} from '@zwirner/design-system'
import {FC} from 'react'

import {
  FEATURE_AVAILABLE_WORKS_TITLE,
  ONLINE_EXHIBITIONS_TITLE,
  ONLINE_EXHIBITIONS_URL,
  UPCOMING_FAIRS_TITLE,
  UPCOMING_FAIRS_URL,
  VIEW_ALL_TITLE,
} from '@/common/constants/commonCopies'

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
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

interface CollectContainerProps {
  data: any
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
      <DzCarousel>
        {data?.map((card: any) => (
          <div className="w-full" key={card.id}>
            <DzCard data={{...card, size: CardSizes['12col']}} type={CARD_TYPES.CONTENT} />
          </div>
        ))}
      </DzCarousel>
    </DzColumn>
  )

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} />
        <FullWidthFlexCol>
          <DzHero items={[heroData]} />
          <div className={styles.sectionWithTitleMolecule}>
            <DzTitleMolecule
              type={DzTitleMoleculeTypes.MOLECULE}
              data={{
                title: ONLINE_EXHIBITIONS_TITLE,
                titleProps: {titleType: TITLE_TYPES.H2},
                linkCTA: {
                  text: VIEW_ALL_TITLE,
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
                title: UPCOMING_FAIRS_TITLE,
                titleProps: {titleType: TITLE_TYPES.H2},
                linkCTA: {
                  text: VIEW_ALL_TITLE,
                  linkElement: 'a',
                  url: UPCOMING_FAIRS_URL,
                },
              }}
            />
            {fairsCarousel ? renderCarousel(fairsCarousel) : null}
          </div>
          <DzComplexGrid
            textProps={{text: FEATURE_AVAILABLE_WORKS_TITLE, className: styles.textGrid}}
            {...artworksData}
          />
          <div className={styles.consignmentsSection}>
            <h2 className="sr-only">Consignments</h2>
            <DzEditorial {...formProps.editorial} />
            <DzForm {...formProps.form} onSubmit={() => null} />
          </div>

          <h2 className="sr-only">Utopia Editions</h2>
          <DzSplit {...utopiaSplitData} />

          <div className="-mx-5">
            <DzInterstitial {...platformData} />
          </div>

          <div className="-mx-5">
            <DzInterstitial {...interstitialData} />
          </div>
          <div></div>
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
