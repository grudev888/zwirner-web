import {
  CARD_TYPES,
  CardSizes,
  carouselSizeToCardSize,
  DzCard,
  DzCarouselCardSize,
  DzColumn,
  DzGridColumns,
  DzInterstitial,
  DzSplit,
  DzTabsCards,
  SPLIT_TYPES,
} from '@zwirner/design-system'
import cn from 'classnames'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

import styles from './home.module.css'
import {
  mapArticlesGrid,
  mapCarouselCards,
  mapFeaturedContentSplit,
  mapHeaderCarousel,
  mapInterstitialComponents,
  mapTabsLocations,
} from './mapper'

interface HomeContainerProps {
  data: any
}

const DzHero = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzHero), {
  ssr: false,
})

const DzCarousel = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzCarousel), {
  ssr: false,
})

export const HomeContainer: FC<HomeContainerProps> = ({data}) => {
  const {header, featured, articles, interstitial, locations, firstCarousel, secondCarousel} = data
  const itemsHeroCarousel = mapHeaderCarousel(header)
  const featuredContent = mapFeaturedContentSplit(featured)
  const gridData = mapArticlesGrid(articles)
  const interstitialData = mapInterstitialComponents(interstitial)
  const tabsLocations = mapTabsLocations(locations)

  const firstCarouselCards = mapCarouselCards(firstCarousel?.items)
  const secondCarouselCards = mapCarouselCards(secondCarousel?.items)

  const renderCarousel = (data: any, size: DzCarouselCardSize = DzCarouselCardSize.L) => (
    <DzColumn span={12}>
      <DzCarousel size={size} className={styles.fullSection}>
        {data?.map((card: any) => (
          <DzCard
            key={card.id}
            data={{...card, size: [CardSizes['10col'], carouselSizeToCardSize?.[size]]}}
            type={CARD_TYPES.CONTENT}
          />
        ))}
      </DzCarousel>
    </DzColumn>
  )

  return (
    <DzColumn span={12}>
      <h1 className="sr-only">David Zwirner Gallery</h1>
      <FullWidthFlexCol>
        <section>
          <h2 className="sr-only">Highlights</h2>
          <DzHero items={itemsHeroCarousel} />
        </section>

        {!!featuredContent && (
          <section>
            <h2 className="sr-only">Featured</h2>
            <DzSplit type={SPLIT_TYPES.SHORT} data={featuredContent} />
          </section>
        )}

        {!!firstCarouselCards.length && (
          <section>
            <h2 className="sr-only">Now Open</h2>
            {renderCarousel(firstCarouselCards, firstCarousel?.size)}
          </section>
        )}

        {!!firstCarouselCards.length && (
          <section>
            <h2 className="sr-only">Selected Press</h2>
            {renderCarousel(secondCarouselCards, secondCarousel?.size)}
          </section>
        )}

        {gridData && (
          <section>
            <h2 className="sr-only">News & Museum Exhibitions</h2>
            <DzGridColumns className={styles.grid}>
              {gridData.map((article, index) => (
                <DzColumn span={4} key={`article-${index}`}>
                  <DzCard type={CARD_TYPES.CONTENT} data={{...article, size: CardSizes['4col']}} />
                </DzColumn>
              ))}
            </DzGridColumns>
          </section>
        )}

        <section>
          <h2 className="sr-only">Subscribe</h2>
          <DzInterstitial data={interstitialData} />
        </section>

        <section>
          <h2 className="sr-only">Locations</h2>
          <DzTabsCards
            className={cn(styles.spacer, styles.fullSection)}
            tabs={tabsLocations}
            span={[12, 3]}
          />
        </section>
      </FullWidthFlexCol>
    </DzColumn>
  )
}
