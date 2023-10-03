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
  EditorialType,
  TITLE_TYPES,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {
  EXHIBITIONS_URL,
  FEATURE_AVAILABLE_WORKS_TITLE,
  ONLINE_EXHIBITIONS_TITLE,
  UPCOMING_FAIRS_TITLE,
  UPCOMING_FAIRS_URL,
  VIEW_ALL_TITLE,
} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import styles from './collect.module.css'
import {
  artworksGridMap,
  consignmentsMap,
  exhibitionCarouselMapper,
  heroMapper,
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
  const platformData = dzInterstitialOverrides(platformInterstitial)
  const interstitialData = dzInterstitialOverrides(interstitial)

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
        <ContainerTitle title={title} isWide={true} />
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
                  url: EXHIBITIONS_URL,
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
            <DzEditorial {...formProps.editorial} type={EditorialType.LEFT_BLOCK} />
            <DzForm {...formProps.form} onSubmit={() => null} />
          </div>

          <h2 className="sr-only">Utopia Editions</h2>
          <DzSplit {...utopiaSplitData} />
          {platformData ? <DzInterstitial {...platformData} /> : null}
          {interstitialData ? <DzInterstitial {...interstitialData} /> : null}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
