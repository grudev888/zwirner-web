import {
  BUTTON_VARIANTS,
  CARD_TYPES,
  CardSizes,
  CardTypes,
  carouselSizeToCardSize,
  DzCard,
  DzCarouselCardSize,
  DzColumn,
  DzInterstitial,
  DzSectionMenu,
  DzSplit,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  SPLIT_TYPES,
  TITLE_SIZES,
  TITLE_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC, useCallback, useMemo} from 'react'

import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

import ArtistHeader from './components/ArtistHeader'
import Exhibitions from './components/Exhibitions'
import SelectedPress from './components/SelectedPress'
import {
  mapBiography,
  mapCarouselArticles,
  mapCarouselArtworks,
  mapCarouselBooks,
  mapExhibitions,
  mapFeatured,
  mapGrid,
  mapInterstitial,
  mapSplit,
} from './mapper'

const DzCarousel = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzCarousel), {
  ssr: false,
})

const Biography = dynamic(() => import('./components/Biography').then((mod) => mod.default), {
  ssr: false,
})

interface ArtistsContainerProps {
  data: any
}

export const ArtistDetailContainer: FC<ArtistsContainerProps> = ({data}) => {
  const {isSmall} = useBreakpoints()
  const router = useRouter()

  const featured = mapFeatured(data.featured)
  const survey = mapCarouselArtworks(data.survey)
  const availableWorksBooks = mapSplit(data.availableWorksBooks, () =>
    router.push(`/artists/${router.query.slug}/available-works`)
  )
  const availableWorksInterstitial = mapInterstitial(data.availableWorksInterstitial, () =>
    router.push(`/artists/${router.query.slug}/available-works`)
  )
  const latestExhibitions = mapExhibitions(data.latestExhibitions)
  const exhibitionsInterstitial = mapInterstitial(data.exhibitionsInterstitial, () =>
    router.push(`/artists/${router.query.slug}${EXHIBITIONS_URL}`)
  )
  const guide = mapCarouselArticles(data.guide, isSmall)
  const biography = mapBiography(data.artist)
  const selectedPress = mapGrid(data.selectedPress, 'article', true)
  const books = mapCarouselBooks(data.books)
  const interstitial = mapInterstitial(data.interstitial)

  const renderCarousel = useCallback(
    (data: any, type: CardTypes, link: {title: string; url: string}, id: string) => (
      <section className="-mx-5" id={id}>
        <DzTitleMolecule
          type={DzTitleMoleculeTypes.MOLECULE}
          data={{
            customClass: 'mx-5 mb-5 md:mb-10',
            title: data.title,
            titleProps: {
              titleType: TITLE_TYPES.H2,
              titleSize: TITLE_SIZES.LG,
              subtitleSize: TITLE_SIZES.LG,
              subtitleType: TITLE_TYPES.P,
            },
            linkCTA: {
              text: link.title,
              url: link.url,
              linkElement: Link,
            },
          }}
        />
        <DzCarousel size={data.size}>
          {data.items?.map((card: any) => (
            <DzCard
              key={card.id}
              data={{
                ...card,
                size: [CardSizes['10col'], carouselSizeToCardSize[data.size as DzCarouselCardSize]],
              }}
              type={type}
            />
          ))}
        </DzCarousel>
      </section>
    ),
    []
  )

  const Guide = useMemo(
    () =>
      !!guide
        ? renderCarousel(
            guide,
            CARD_TYPES.CONTENT,
            {title: 'View Guide', url: `/artists/${router.query.slug}/guide`},
            'guide'
          )
        : null,
    [guide, renderCarousel, router.query.slug]
  )

  return (
    <DzColumn span={12}>
      <DzSectionMenu
        sections={[
          {text: 'Survey', id: 'survey'},
          {text: 'Available Works', id: 'available-works'},
          {text: 'Exhibitions', id: 'exhibitions'},
          {text: 'Guide', id: 'guide'},
          {text: 'Biography', id: 'biography'},
          {text: 'Selected Press', id: 'selected-press'},
          {text: 'Books', id: 'books'},
        ]}
        cta={{
          text: 'Inquire',
          ctaProps: {
            variant: BUTTON_VARIANTS.TERTIARY,
          },
        }}
        prefix=""
        sticky
        usePrefix
      />
      <FullWidthFlexCol>
        <ArtistHeader artist={data.artist} intro={data.artistIntro} />

        {featured && <DzSplit data={featured} type={SPLIT_TYPES.SHORT} />}

        {survey &&
          renderCarousel(
            survey,
            CARD_TYPES.ARTWORK,
            {title: 'Explore all Artworks', url: `/artists/${router.query.slug}/survey`},
            'survey'
          )}

        {availableWorksBooks && (
          <DzSplit id="available-works" data={availableWorksBooks} type={SPLIT_TYPES.SHORT} />
        )}

        {availableWorksInterstitial && <DzInterstitial data={availableWorksInterstitial} />}

        {data.moveGuideUp === true && guide ? Guide : null}

        {latestExhibitions && <Exhibitions id="exhibitions" exhibitions={latestExhibitions} />}

        {exhibitionsInterstitial && <DzInterstitial data={exhibitionsInterstitial} />}

        {!data.moveGuideUp && guide ? Guide : null}

        <Biography id="biography" biography={biography} title="Biography" artist={data.artist} />

        {selectedPress && <SelectedPress id="selected-press" selectedPress={selectedPress} />}

        {books &&
          renderCarousel(
            books,
            CARD_TYPES.ARTWORK,
            {title: 'Explore Books', url: `/artists/${router.query.slug}/books`},
            'books'
          )}

        {interstitial && <DzInterstitial data={interstitial} />}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
