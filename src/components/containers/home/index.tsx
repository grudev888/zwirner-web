import {
  DzColumn,
  DzSplit,
  DzHeroCarousel,
  DzCard,
  SPLIT_TYPES,
  CARD_TYPES,
  DzGridColumns,
  DzInterstitial,
  DzTabsCards,
  DzCarousel,
} from '@zwirner/design-system'
import {
  mapHeaderCarousel,
  mapFeaturedContentSplit,
  mapArticlesGrid,
  mapTabsLocations,
  mapCarouselCards,
  mapInterstitialComponents,
} from './mapper'
import {FC} from 'react'
import styles from './home.module.css'
// import {DzInterstitial} from '@/components/pageBuilder/DzInterstitial/DzInterstitial';

interface HomeContainerProps {
  data: any
}

export const HomeContainer: FC<HomeContainerProps> = ({data}) => {

  const {header, featured, articles, interstitial, locations, firstCarousel, secondCarousel} = data
  const itemsHeroCarousel = mapHeaderCarousel(header)
  const featuredContent = mapFeaturedContentSplit(featured)
  const gridData = mapArticlesGrid(articles)
  const interstitialData = mapInterstitialComponents(interstitial)
  const tabsLocations = mapTabsLocations(locations)

  const firstCarouselCards = mapCarouselCards(firstCarousel)
  const secondCarouselCards = mapCarouselCards(secondCarousel)

  const renderCarousel = (data: any) => (
    <DzColumn span={12}>
      <DzCarousel slidesPerView={2}>
        {data.map((card: any) => {
          return <DzCard data={card} type="content" />
        })}
      </DzCarousel>
    </DzColumn>
  )

  return (
    <DzColumn span={12}>
      <div className={styles.homeContainer}>
        <DzHeroCarousel items={itemsHeroCarousel} />
        <DzSplit type={SPLIT_TYPES.SHORT} data={featuredContent} />
        {firstCarouselCards ? renderCarousel(firstCarouselCards) : null}
        {firstCarouselCards ? renderCarousel(secondCarouselCards) : null}
        <DzGridColumns>
          {gridData?.map((article, key) => {
            return (
              <DzColumn className="mb-5" span={4} key={`article-${key}`}>
                <DzCard type={CARD_TYPES.CONTENT} data={article} />
              </DzColumn>
            )
          })}
        </DzGridColumns>
        <DzInterstitial data={interstitialData} />
        <DzTabsCards tabs={tabsLocations} span={3} />
        <div className={styles.spacer}></div>
      </div>
    </DzColumn>
  )
}
