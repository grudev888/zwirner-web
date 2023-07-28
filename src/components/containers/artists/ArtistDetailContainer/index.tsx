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
  useBreakpoints,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC, useCallback, useMemo} from 'react'

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
    router.push(`/artists/${router.query.slug}/exhibitions`)
  )
  const biography = mapBiography(data.artist)
  const guide = mapCarouselArticles(data.guide, isSmall)
  const selectedPress = mapGrid(data.selectedPress, 'article', true)
  const books = mapCarouselBooks(data.books)
  const interstitial = mapInterstitial(data.interstitial)

  const renderCarousel = useCallback(
    (data: any, type: CardTypes, link: {title: string; url: string}, id: string) => (
      <section className="-mx-5" id={id}>
        <DzTitleMolecule
          type={DzTitleMoleculeTypes.SECTION}
          data={{
            customClass: 'mx-5 mb-5 md:mb-10',
            title: data.title,
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
            'artist-guide'
          )
        : null,
    [guide, renderCarousel, router.query.slug]
  )

  return (
    <DzColumn span={12}>
      <DzSectionMenu
        cta={{
          text: 'Inquire',
          ctaProps: {
            variant: BUTTON_VARIANTS.TERTIARY,
          },
        }}
        prefix="artist-"
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
            'artist-survey'
          )}

        {availableWorksBooks && (
          <DzSplit
            id="artist-available-works"
            data={availableWorksBooks}
            type={SPLIT_TYPES.SHORT}
          />
        )}

        {availableWorksInterstitial && <DzInterstitial data={availableWorksInterstitial} />}

        {data.moveGuideUp === true && guide ? Guide : null}

        {latestExhibitions && (
          <Exhibitions id="artist-exhibitions" exhibitions={latestExhibitions} />
        )}

        {exhibitionsInterstitial && <DzInterstitial data={exhibitionsInterstitial} />}

        {!data.moveGuideUp && guide ? Guide : null}

        <Biography
          id="artist-biography"
          biography={biography}
          title="Biography"
          artist={data.artist}
        />

        {selectedPress && (
          <SelectedPress id="artist-selected-press" selectedPress={selectedPress} />
        )}

        {books &&
          renderCarousel(
            books,
            CARD_TYPES.ARTWORK,
            {title: 'Explore Books', url: `/artists/${router.query.slug}/books`},
            'artist-books'
          )}

        {interstitial && <DzInterstitial data={interstitial} />}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
