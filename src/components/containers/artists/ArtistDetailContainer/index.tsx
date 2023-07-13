import {
  CARD_TYPES,
  CardSizes,
  CardTypes,
  carouselSizeToCardSize,
  DzCard,
  DzCarousel,
  DzCarouselCardSize,
  DzColumn,
  DzInterstitial,
  DzSplit,
  SPLIT_TYPES,
  useBreakpoints,
} from '@zwirner/design-system'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

import ArtistHeader from './components/ArtistHeader'
import Biography from './components/Biography'
import Exhibitions from './components/Exhibitions'
import SectionTitle from './components/SectionTitle'
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

  const renderCarousel = (data: any, type: CardTypes, linkTitle: string) => (
    <section className="-mx-5">
      <SectionTitle className="mx-5" title={data.title} linkTitle={linkTitle} />
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
      <FullWidthFlexCol>
        <ArtistHeader artist={data.artist} intro={data.artistIntro} />

        {hero && <DzSplit data={hero} type={SPLIT_TYPES.SHORT} />}

        {survey && renderCarousel(survey, CARD_TYPES.ARTWORK, 'Explore all Artworks')}

        {availableWorksBooks && <DzSplit data={availableWorksBooks} type={SPLIT_TYPES.SHORT} />}

        {availableWorksInterstitial && <DzInterstitial data={availableWorksInterstitial} />}

        {latestExhibitions && <Exhibitions exhibitions={latestExhibitions} />}

        {exhibitionsInterstitial && <DzInterstitial data={exhibitionsInterstitial} />}

        {guide && renderCarousel(guide, CARD_TYPES.CONTENT, 'Explore Guide')}

        <Biography biography={biography} title="Biography" artist={data.artist} />

        {selectedPress && <SelectedPress selectedPress={selectedPress} />}

        {books && renderCarousel(books, CARD_TYPES.ARTWORK, 'Explore More')}

        {interstitial && <DzInterstitial data={interstitial} />}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
