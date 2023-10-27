import {
  BUTTON_VARIANTS,
  DzColumn,
  DzSectionMenu,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  FORM_MODAL_TYPES,
  INQUIRY_TYPES,
  TITLE_SIZES,
  TITLE_TYPES,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useMemo} from 'react'

import {
  ARTISTS_URL,
  AVAILABLE_WORKS,
  DAVID_ZWIRNER_BOOKS,
  EXHIBITIONS_URL,
  EXPLORE_ALL_ARTWORKS,
  EXPLORE_AVAILABLE_WORKS,
  EXPLORE_BOOKS,
  EXPLORE_GUIDE,
  GUIDE,
  INQUIRE,
  LATEST_EXHIBITIONS,
  PLEASE_PROVIDE_YOUR_CONTACT_SHORT,
  SURVEY,
  TO_LEARN_MORE_ABOUT,
} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import {useHashRoutedInquiryModal} from '@/components/hooks/useHashRoutedInquiryModal'
import PageBuilder, {addCTAToComponent} from '@/components/pageBuilder'
import {showCarouselSection} from '@/components/pageBuilder/DzCarousel/dzCarouselMapper'
import {showInterstitialSection} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {showSplitSection} from '@/components/pageBuilder/DzSplit/splitMappers'
import {showGridSection} from '@/components/pageBuilder/GridMolecule/gridMapper'

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
    availableWorksBooks,
    availableWorksInterstitial,
    exhibitionsInterstitial,
    availableWorks,
    latestExhibitions,
    survey,
    guide,
    selectedPress,
    books,
  } = data ?? {}

  const router = useRouter()
  // Add custom CTA to DzSplit inside the pageBuilder
  const availableWorksBooksData = addCTAToComponent({
    data: availableWorksBooks,
    onCTAClick: () => router.push(`${ARTISTS_URL}/${router.query.slug}/available-works`),
    component: 'dzSplit',
  })

  // Add custom CTA to DzInterstitial inside the pageBuilder
  const availableWorksInterstitialData = addCTAToComponent({
    data: availableWorksInterstitial,
    onCTAClick: () => router.push(`${ARTISTS_URL}/${router.query.slug}/available-works`),
    component: 'dzInterstitial',
  })

  const exhibitionsInterstitialData = addCTAToComponent({
    data: exhibitionsInterstitial,
    onCTAClick: () => router.push(`${ARTISTS_URL}/${router.query.slug}${EXHIBITIONS_URL}`),
    component: 'dzInterstitial',
  })

  const inquireModalProps = useHashRoutedInquiryModal({
    id: data?.artist?._id,
    ctaText: 'Inquire',
    title: data?.artist?.fullName,
    inquiryType: INQUIRY_TYPES.ARTIST,
  })

  const biography = mapBiography(data.artist)

  const inquireModalSubtitle = `${TO_LEARN_MORE_ABOUT} ${data.artist?.fullName}, ${PLEASE_PROVIDE_YOUR_CONTACT_SHORT}`

  const Guide = useMemo(
    () =>
      guide ? (
        <section className="-mx-5" id="guide">
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
            LinkElement={Link}
          />
          <PageBuilder components={[guide]} />
        </section>
      ) : null,
    [guide, router.query.slug]
  )

  return (
    <>
      <RecaptchaInquireFormModal
        type={FORM_MODAL_TYPES.INQUIRE}
        {...inquireModalProps}
        title={INQUIRE}
        subtitle={inquireModalSubtitle}
      />
      <DzColumn span={12}>
        <DzSectionMenu
          sections={[
            {text: 'Survey', id: 'survey', hidden: !showCarouselSection(survey)},
            {
              text: 'Available Works',
              id: 'available-works',
              hidden: !showSplitSection(availableWorksBooksData),
            },
            {
              text: 'Exhibitions',
              id: 'exhibitions',
              hidden: !showGridSection(latestExhibitions),
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
              onClick: () =>
                inquireModalProps.openClickHandler({
                  title: data.artist.fullName,
                  ctaText: 'Inquire',
                  inquiryType: INQUIRY_TYPES.ARTIST,
                }),
            },
          }}
          prefix=""
          sticky
          usePrefix
          LinkElement={Link}
        />
        <FullWidthFlexCol>
          <ArtistHeader artist={data.artist} intro={data.artistIntro} />
          {/* Page Builder SPLIT for featured items*/}
          {showSplitSection(featured) ? <PageBuilder components={[featured]} /> : null}

          {/* Page Builder CAROUSEL for survey items*/}
          {showCarouselSection(survey) ? (
            <section className="-mx-5" id="survey">
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
                LinkElement={Link}
              />
              <PageBuilder components={[survey]} />
            </section>
          ) : null}

          {/* Page Builder SPLIT for available works books*/}
          {showSplitSection(availableWorksBooksData) ? (
            <PageBuilder components={[availableWorksBooksData]} />
          ) : null}

          {/* Page Builder GRID for available works*/}
          {showGridSection(availableWorks) ? (
            <section id="available-works">
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
                LinkElement={Link}
              />
              <PageBuilder components={[availableWorks]} />
            </section>
          ) : null}

          {/* Page Builder INTERSTITIAL for available works*/}
          {showInterstitialSection(availableWorksInterstitialData) ? (
            <PageBuilder components={[availableWorksInterstitialData]} />
          ) : null}

          {/* Page Builder CAROUSEL for guide cards*/}
          {data.moveGuideUp === true && showCarouselSection(guide) ? Guide : null}

          {/* Page Builder GRID for latest exhibitions*/}
          {showGridSection(latestExhibitions) ? (
            <section id="exhibitions">
              <DzTitleMolecule
                type={DzTitleMoleculeTypes.MOLECULE}
                data={{
                  title: LATEST_EXHIBITIONS,
                  titleProps: {
                    titleType: TITLE_TYPES.H2,
                    titleSize: TITLE_SIZES.LG,
                    subtitleSize: TITLE_SIZES.LG,
                    subtitleType: TITLE_TYPES.P,
                  },
                  customClass: 'mb-5 md:mb-10',
                }}
                LinkElement={Link}
              />

              {latestExhibitions ? <PageBuilder components={[latestExhibitions]} /> : null}
            </section>
          ) : null}

          {/* Page Builder INTERSTITIAL for exhibitions*/}
          {showInterstitialSection(exhibitionsInterstitialData) ? (
            <PageBuilder components={[exhibitionsInterstitialData]} />
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
            <section className="-mx-5" id="books">
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
                    url: `${ARTISTS_URL}/${router.query.slug}/books`,
                  },
                }}
                LinkElement={Link}
              />
              <PageBuilder components={[books]} />
            </section>
          ) : null}

          {/* Page Builder INTERSTITIAL for available works*/}
          {showInterstitialSection(interstitial) ? (
            <PageBuilder components={[interstitial]} />
          ) : null}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
