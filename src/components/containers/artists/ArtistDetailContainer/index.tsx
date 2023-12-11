import {
  BUTTON_VARIANTS,
  DzColumn,
  DzSection,
  DzTitleMoleculeTypes,
  TITLE_SIZES,
  TITLE_TYPES,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import {useMemo} from 'react'

import {
  ARTISTS_URL,
  AVAILABLE_WORKS,
  BOOKS_URL,
  DAVID_ZWIRNER_BOOKS,
  EXHIBITIONS,
  EXHIBITIONS_URL,
  EXPLORE_ALL_ARTWORKS,
  EXPLORE_AVAILABLE_WORKS,
  EXPLORE_BOOKS,
  EXPLORE_GUIDE,
  GUIDE,
  SURVEY,
} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {
  createInquireModalArtistProps,
  useOpenInquiryDispatch,
} from '@/components/hooks/useOpenInquiryDispatch'
import PageBuilder, {addCTAToComponent, showPageBuilderSection} from '@/components/pageBuilder'
import {showCarouselSection} from '@/components/pageBuilder/DzCarousel/dzCarouselMapper'
import {showInterstitialSection} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {showSplitSection} from '@/components/pageBuilder/DzSplit/splitMappers'
import {showGridSection} from '@/components/pageBuilder/GridMolecule/gridMapper'
import {DzSectionMenu} from '@/components/wrappers/DzSectionMenuWrapper'
import {DzTitleMolecule} from '@/components/wrappers/DzTitleMoleculeWrapper'
import {ModalTriggerEvent, ModalTriggerTypes} from '@/events/ModalTriggerEvent'
import {PageBuilderComponentsDataSchemaType} from '@/sanity/queries/page/pageCommonQueries/pageBuilderComponentsData'
import {ModalTypes} from '@/sanity/types'

import ArtistHeader from './components/ArtistHeader'
import {mapBiography} from './mapper'

const Biography = dynamic(() => import('./components/Biography').then((mod) => mod.default), {
  ssr: false,
})

const SelectedPress = dynamic(
  () => import('./components/SelectedPress').then((mod) => mod.default),
  {
    ssr: false,
  }
)

type ArtistsContainerProps = {
  data: any
}

export const ArtistDetailContainer = ({data}: ArtistsContainerProps) => {
  const {
    featured,
    interstitial,
    availableWorks,
    latestExhibitions,
    survey,
    surveyThomas,
    guide,
    selectedPress,
    books,
  } = data ?? {}
  const router = useRouter()

  const surveyToShow = router?.query?.slug === 'thomas-ruff' ? surveyThomas : survey

  const inquireModalProps = createInquireModalArtistProps(data.artist)
  const hideAWTitle = availableWorks?.some((component: PageBuilderComponentsDataSchemaType) => {
    const {_type} = component ?? {}
    return _type === 'dzSplit' || _type === 'dzInterstitial'
  })
  useOpenInquiryDispatch(inquireModalProps)

  const latestExhibitionMapped = latestExhibitions?.map(
    (item: PageBuilderComponentsDataSchemaType) => {
      const {_type} = item ?? {}
      if (_type === 'dzInterstitial') {
        return addCTAToComponent({
          data: item,
          onCTAClick: () => router.push(`${ARTISTS_URL}/${router.query.slug}${EXHIBITIONS_URL}`),
          component: 'dzInterstitial',
        })
      }
      return item
    }
  )

  const biography = mapBiography(data.artist)

  const onClickInquire = () => {
    window.document.dispatchEvent(
      ModalTriggerEvent(ModalTypes.INQUIRE, inquireModalProps, ModalTriggerTypes.CTA)
    )
  }

  const Guide = useMemo(
    () =>
      guide ? (
        <DzSection className="-mx-5" id="guide">
          <DzTitleMolecule
            type={DzTitleMoleculeTypes.MOLECULE}
            data={{
              customClass: 'mx-5 mb-5 md:mb-10',
              title: GUIDE,
              titleProps: {
                titleType: TITLE_TYPES.H2,
                titleSize: TITLE_SIZES.LG,
                subtitleSize: TITLE_SIZES.LG,
                subtitleType: TITLE_TYPES.P,
              },
              linkCTA: {
                text: EXPLORE_GUIDE,
                url: `${ARTISTS_URL}/${router.query.slug}/guide`,
              },
            }}
          />
          <PageBuilder components={[guide]} />
        </DzSection>
      ) : null,
    [guide, router.query.slug]
  )

  return (
    <DzColumn span={12}>
      <DzSectionMenu
        sections={[
          {text: 'Survey', id: 'survey', hidden: !showCarouselSection(surveyToShow)},
          {
            text: 'Available Works',
            id: 'available-works',
            hidden: !showPageBuilderSection(availableWorks),
          },
          {
            text: 'Exhibitions',
            id: 'exhibitions',
            hidden: !showPageBuilderSection(latestExhibitions),
          },
          {text: 'Guide', id: 'guide', hidden: !showCarouselSection(guide)},
          {text: 'Biography', id: 'biography'},
          {
            text: 'Selected Press',
            id: 'selected-press',
            hidden: !showGridSection(selectedPress),
          },
          {text: 'Books', id: 'books', hidden: !showCarouselSection(books)},
        ]}
        cta={{
          text: 'Inquire',
          ctaProps: {
            variant: BUTTON_VARIANTS.TERTIARY,
            onClick: onClickInquire,
          },
        }}
        prefix=""
        sticky
        usePrefix
      />
      <FullWidthFlexCol>
        <ArtistHeader artist={data.artist} intro={data.artistIntro} />
        {/* Page Builder SPLIT for featured items*/}
        {showSplitSection(featured) ? <PageBuilder components={[featured]} /> : null}
        {/* Page Builder CAROUSEL for survey items*/}
        {showCarouselSection(surveyToShow) ? (
          <DzSection className="-mx-5" id="survey">
            <DzTitleMolecule
              type={DzTitleMoleculeTypes.MOLECULE}
              data={{
                customClass: 'mx-5 mb-5 md:mb-10',
                title: SURVEY,
                titleProps: {
                  titleType: TITLE_TYPES.H2,
                  titleSize: TITLE_SIZES.LG,
                  subtitleSize: TITLE_SIZES.LG,
                  subtitleType: TITLE_TYPES.P,
                },
                linkCTA: {
                  text: EXPLORE_ALL_ARTWORKS,
                  url: `${ARTISTS_URL}/${router.query.slug}/survey`,
                },
              }}
            />
            <PageBuilder components={[surveyToShow]} />
          </DzSection>
        ) : null}
        {showPageBuilderSection(availableWorks) ? (
          <DzSection id="available-works">
            {!hideAWTitle ? (
              <>
                <DzTitleMolecule
                  type={DzTitleMoleculeTypes.MOLECULE}
                  data={{
                    customClass: 'mr-5 mb-5 md:mb-10',
                    title: AVAILABLE_WORKS,
                    titleProps: {
                      titleType: TITLE_TYPES.H2,
                      titleSize: TITLE_SIZES.LG,
                      subtitleSize: TITLE_SIZES.LG,
                      subtitleType: TITLE_TYPES.P,
                    },
                    linkCTA: {
                      text: EXPLORE_AVAILABLE_WORKS,
                      url: `${ARTISTS_URL}/${router.query.slug}/available-works`,
                    },
                  }}
                />
                <PageBuilder components={availableWorks} innerSection />
              </>
            ) : (
              <PageBuilder components={availableWorks} innerSection />
            )}
          </DzSection>
        ) : null}
        {/* Page Builder CAROUSEL for guide cards*/}
        {data.moveGuideUp === true && showCarouselSection(guide) ? Guide : null}
        {/* Page Builder GRID for latest exhibitions*/}

        {showPageBuilderSection(latestExhibitions) ? (
          <DzSection id="exhibitions">
            <DzTitleMolecule
              type={DzTitleMoleculeTypes.MOLECULE}
              data={{
                title: EXHIBITIONS,
                titleProps: {
                  titleType: TITLE_TYPES.H2,
                  titleSize: TITLE_SIZES.LG,
                  subtitleSize: TITLE_SIZES.LG,
                  subtitleType: TITLE_TYPES.P,
                },
                customClass: 'mb-5 md:mb-10',
              }}
            />

            <PageBuilder components={latestExhibitionMapped} />
          </DzSection>
        ) : null}

        {/* Page Builder CAROUSEL for guide cards*/}
        {!data.moveGuideUp && showCarouselSection(guide) ? Guide : null}
        <Biography id="biography" biography={biography} title="Biography" artist={data.artist} />
        {/* Page Builder GRID for selected press cards*/}
        {showGridSection(selectedPress) ? (
          <SelectedPress id="selected-press" selectedPress={selectedPress} />
        ) : null}
        {/* Page Builder CAROUSEL for guide cards*/}
        {showCarouselSection(books) ? (
          <DzSection className="-mx-5" id="books">
            <DzTitleMolecule
              type={DzTitleMoleculeTypes.MOLECULE}
              data={{
                customClass: 'mx-5 mb-5 md:mb-10',
                title: DAVID_ZWIRNER_BOOKS,
                titleProps: {
                  titleType: TITLE_TYPES.H2,
                  titleSize: TITLE_SIZES.LG,
                  subtitleSize: TITLE_SIZES.LG,
                  subtitleType: TITLE_TYPES.P,
                },
                linkCTA: {
                  text: EXPLORE_BOOKS,
                  url: BOOKS_URL,
                },
              }}
            />
            <PageBuilder components={[books]} />
          </DzSection>
        ) : null}
        {/* Page Builder INTERSTITIAL for available works*/}
        {showInterstitialSection(interstitial) ? <PageBuilder components={[interstitial]} /> : null}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
