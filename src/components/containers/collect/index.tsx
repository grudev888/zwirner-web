import {
  CARD_TYPES,
  CardSizes,
  carouselSizeToCardSize,
  DzCard,
  DzCarouselCardSize,
  DzColumn,
  DzEditorial,
  DzForm,
  DzHero,
  DzInterstitial,
  DzSplit,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  TITLE_TYPES,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {
  FEATURE_AVAILABLE_WORKS_TITLE,
  ONLINE_EXHIBITIONS_TITLE,
  ONLINE_EXHIBITIONS_URL,
  UPCOMING_FAIRS_TITLE,
  UPCOMING_FAIRS_URL,
  VIEW_ALL_TITLE,
} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

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

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {ssr: false}
)

const DzCarousel = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzCarousel), {
  ssr: false,
})

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
  const exhibitionsCarousel = exhibitionCarouselMapper(exhibitions?.items)
  const fairsCarousel = exhibitionCarouselMapper(fairs?.items)
  const artworksData = artworksGridMap(featuredArtworks)
  const formProps = consignmentsMap(consignmentsFeature)
  const utopiaSplitData = utopiaFeatureMap(utopiaFeature)
  const platformData = platformInterstitialMap(platformInterstitial)
  const interstitialData = interstitialMap(interstitial)

  const renderCarousel = (data: any, size: DzCarouselCardSize = DzCarouselCardSize.L) => (
    <DzColumn span={12} className={styles.fullSection}>
      <DzCarousel size={size}>
        {data?.map((card: any) => (
          <div className="w-full" key={card.id}>
            <DzCard
              data={{...card, size: [CardSizes['10col'], carouselSizeToCardSize[size]]}}
              type={CARD_TYPES.CONTENT}
            />
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
            {exhibitionsCarousel ? renderCarousel(exhibitionsCarousel, exhibitions?.size) : null}
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
            {fairsCarousel ? renderCarousel(fairsCarousel, fairs?.size) : null}
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
          <DzInterstitial {...platformData} />
          <DzInterstitial {...interstitialData} />
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
