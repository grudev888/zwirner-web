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
import {FC} from 'react'

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

  const hero = data.showHero ? mapSplit(data.hero) : null
  const survey = mapCarouselArtworks(data.survey)
  const availableWorksBooks = mapSplit(data.availableWorksBooks)
  const availableWorksInterstitial = mapInterstitial(data.availableWorksInterstitial)
  const latestExhibitions = mapExhibitions(data.latestExhibitions)
  const exhibitionsInterstitial = mapInterstitial(data.exhibitionsInterstitial)
  const guide = mapCarouselArticles(data.guide, isSmall)
  const biography = mapBiography(data.artist)
  const selectedPress = mapGrid(data.selectedPress, 'article')
  const books = mapCarouselArtworks(data.books)
  const interstitial = mapInterstitial(data.interstitial)

  const renderCarousel = (data: any, type: CardTypes, linkTitle: string, id: string) => (
    <section className="-mx-5" id={id}>
      <DzTitleMolecule
        type={DzTitleMoleculeTypes.SECTION}
        data={{
          customClass: 'mx-5 mb-5 md:mb-10',
          title: data.title,
          linkCTA: {
            text: linkTitle,
            url: '#',
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
          renderCarousel(survey, CARD_TYPES.ARTWORK, 'Explore all Artworks', 'artist-survey')}

        {availableWorksBooks && (
          <DzSplit
            id="artist-available-works"
            data={availableWorksBooks}
            type={SPLIT_TYPES.SHORT}
          />
        )}

        {availableWorksInterstitial && <DzInterstitial data={availableWorksInterstitial} />}

        {latestExhibitions && (
          <Exhibitions id="artist-exhibitions" exhibitions={latestExhibitions} />
        )}

        {exhibitionsInterstitial && <DzInterstitial data={exhibitionsInterstitial} />}

        {guide && renderCarousel(guide, CARD_TYPES.CONTENT, 'Explore Guide', 'artist-guide')}

        <Biography
          id="artist-biography"
          biography={biography}
          title="Biography"
          artist={data.artist}
        />

        {selectedPress && <SelectedPress id="artist-press" selectedPress={selectedPress} />}

        {books && renderCarousel(books, CARD_TYPES.ARTWORK, 'Explore More', 'artist-books')}

        {interstitial && <DzInterstitial data={interstitial} />}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
