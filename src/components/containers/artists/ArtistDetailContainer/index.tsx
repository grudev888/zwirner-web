import {
  BUTTON_VARIANTS,
  CARD_TYPES,
  CardSizes,
  CardTypes,
  carouselSizeToCardSize,
  DzCard,
  DzCarousel,
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
import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC, useCallback, useMemo} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

import ArtistHeader from './components/ArtistHeader'
import Biography from './components/Biography'
import Exhibitions from './components/Exhibitions'
import SelectedPress from './components/SelectedPress'
import {
  mapBiography,
  mapCarouselArticles,
  mapCarouselArtworks,
  mapExhibitions,
  mapGrid,
  mapInterstitial,
  mapSplit,
} from './mapper'

interface ArtistsContainerProps {
  data: any
}

export const ArtistDetailContainer: FC<ArtistsContainerProps> = ({data}) => {
  const {isSmall} = useBreakpoints()
  const router = useRouter()

  const hero = data.showHero ? mapSplit(data.hero) : null
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
  const guide = mapCarouselArticles(data.guide, isSmall)
  const biography = mapBiography(data.artist)
  const selectedPress = mapGrid(data.selectedPress, 'article')
  const books = mapCarouselArtworks(data.books)
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
            {title: 'Explore Guide', url: `/artists/${router.query.slug}/guide`},
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

        {hero && <DzSplit data={hero} type={SPLIT_TYPES.SHORT} />}

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

        {selectedPress && <SelectedPress id="artist-press" selectedPress={selectedPress} />}

        {books &&
          renderCarousel(
            books,
            CARD_TYPES.ARTWORK,
            {title: 'Explore More', url: `/artists/${router.query.slug}/books`},
            'artist-books'
          )}

        {interstitial && <DzInterstitial data={interstitial} />}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
