import {
  CARD_TYPES,
  CardSizes,
  CardTypes,
  carouselSizeToCardSize,
  DzCard,
  DzCarousel,
  DzCarouselCardSize,
  DzColumn,
  DzComplexGrid,
  DzHero,
  DzInterstitial,
  DzLink,
  DzSplit,
  DzText,
  DzTitle,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  LINK_VARIANTS,
  SPLIT_TYPES,
  TEXT_SIZES,
  TITLE_SIZES,
  TITLE_TYPES,
} from '@zwirner/design-system'
import Link from 'next/link'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

import {
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

export const ArtistsContainer: FC<ArtistsContainerProps> = ({data}) => {
  const hero = mapSplit(data.hero)
  const survey = mapCarouselArtworks(data.survey)
  const availableWorksBooks = mapSplit(data.availableWorksBooks)
  const availableWorksInterstitial = mapInterstitial(data.availableWorksInterstitial, 'dark')
  const latestExhibitions = mapExhibitions(data.latestExhibitions)
  const exhibitionsInterstitial = mapInterstitial(data.exhibitionsInterstitial, 'dark')
  const guide = mapCarouselArticles(data.guide)
  // const biography = mapEditorial(data.biography)
  const selectedPress = mapGrid(data.selectedPress, 'article')
  const books = mapCarouselArtworks(data.books)
  const interstitial = mapInterstitial(data.interstitial, 'light')

  const renderCarousel = (data: any, type: CardTypes, linkTitle: string) => (
    <section>
      <div className="mb-10 flex justify-between">
        <DzTitle titleType={TITLE_TYPES.H2} title={data.title} titleSize={TITLE_SIZES.XL} />
        <DzLink LinkElement={Link} href={'#'}>
          {linkTitle}
        </DzLink>
      </div>

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
        <section className="space-between flex flex-row">
          <DzTitleMolecule
            type={DzTitleMoleculeTypes.PAGE}
            data={{
              title: data.artist?.fullName,
              customClass: 'flex-1',
              titleProps: {
                titleType: TITLE_TYPES.H1,
                titleSize: TITLE_SIZES.XXL,
              },
            }}
          />
          <div className="flex flex-1 flex-col">
            <DzText textSize={TEXT_SIZES.SMALL} text={data.artist?.description} />
            <DzLink variant={LINK_VARIANTS.TEXT} LinkElement={Link} href={'#'}>
              Learn More
            </DzLink>
          </div>
        </section>

        <DzSplit data={hero} type={SPLIT_TYPES.SHORT} />

        {survey && renderCarousel(survey, CARD_TYPES.ARTWORK, 'Explore all Artworks')}

        <DzSplit data={availableWorksBooks} type={SPLIT_TYPES.SHORT} />

        {availableWorksInterstitial && <DzInterstitial data={availableWorksInterstitial} />}

        {latestExhibitions._type === 'grid' ? (
          <DzComplexGrid {...latestExhibitions.data} />
        ) : (
          <DzHero items={latestExhibitions.data} />
        )}

        {exhibitionsInterstitial && <DzInterstitial data={exhibitionsInterstitial} />}

        {guide && renderCarousel(guide, CARD_TYPES.CONTENT, 'Explore Guide')}

        {/* <DzEditorial type={EDITORIAL_TYPES.COMPLEX} data={biography} /> */}

        <DzComplexGrid {...selectedPress} />

        {books && renderCarousel(books, CARD_TYPES.ARTWORK, 'Explore More')}

        {interstitial && <DzInterstitial data={interstitial} />}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
