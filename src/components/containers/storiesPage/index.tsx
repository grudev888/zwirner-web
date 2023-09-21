import {
  CARD_TYPES,
  CardSizes,
  CardTypes,
  carouselSizeToCardSize,
  DzCard,
  DzCarouselCardSize,
  DzColumn,
  DzGridColumns,
  DzHero,
  DzInterstitial,
  DzSplit,
  DzTitleMolecule,
  DzTitleMoleculeTypes,
  TITLE_TYPES,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {FC, useCallback} from 'react'

import {
  BOOKS_URL,
  FEATURED_NEW_BOOKS,
  FEATURED_PODCAST,
  FEATURED_VIDEOS,
  LISTEN_MORE_PODCAST,
  NEWS_AND_PRESS_HIGHLIGHTS,
  PODCAST_URL,
  VIDEOS_URL,
  VIEW_ALL_TITLE,
  WATCH_MORE_VIDEOS,
} from '@/common/constants/commonCopies'
import {articlesGridMap} from '@/components/containers/articles/mapper'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {
  featuredPodcastMap,
  featuredVideosMap,
  heroMapper,
  mapBookForCarousel,
  mapBookForSplit,
  mapFeaturedBooks,
} from './mapper'

const DzCarousel = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzCarousel), {
  ssr: false,
})

interface StoriesContainerProps {
  data: any
}

export const StoriesContainer: FC<StoriesContainerProps> = ({data}) => {
  const {
    title,
    hero,
    mailingListInterstitial,
    featuredVideos,
    featuredPodcast,
    articles,
    featuredBooks,
  } = data ?? {}

  const heroData = heroMapper(hero)
  const interstitialData = dzInterstitialOverrides(mailingListInterstitial)
  const featuredVideosData = featuredVideosMap(featuredVideos)
  const featuredPodcastData = featuredPodcastMap(featuredPodcast)
  const articlesGrid = articlesGridMap(articles)
  const books = mapFeaturedBooks(featuredBooks)

  const renderCarousel = useCallback(
    (data: any, type: CardTypes, link: {title: string; url: string}, id: string) => {
      if (!featuredBooks) return null
      return (
        <section className="-mx-5" id={id}>
          <DzTitleMolecule
            type={DzTitleMoleculeTypes.SECTION}
            data={{
              customClass: 'mx-5 mb-5 md:mb-10',
              title: data.title ?? FEATURED_NEW_BOOKS,
              linkCTA: {
                text: link.title,
                url: link.url,
                linkElement: Link,
              },
              isWide: true,
            }}
          />
          <DzCarousel size={data.size}>
            {data.items?.map((card: any) => (
              <DzCard
                key={card?._id}
                data={{
                  ...mapBookForCarousel(card),
                  size: [
                    CardSizes['10col'],
                    carouselSizeToCardSize[data.size as DzCarouselCardSize],
                  ],
                }}
                type={type}
              />
            ))}
          </DzCarousel>
        </section>
      )
    },
    [featuredBooks]
  )

  const renderSplit = useCallback(
    (data: any) => {
      if (!featuredBooks) return null
      return <DzSplit {...mapBookForSplit(data)} />
    },
    [featuredBooks]
  )

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} isWide={true} />
        <FullWidthFlexCol>
          {hero && heroData?.media?.imgProps?.src ? <DzHero items={[heroData]} /> : null}
          {featuredVideos ? (
            <section>
              <ContainerTitle
                title={FEATURED_VIDEOS}
                type={DzTitleMoleculeTypes.MOLECULE}
                titleType={TITLE_TYPES.H2}
                linkCTA={{
                  text: WATCH_MORE_VIDEOS,
                  linkElement: 'a',
                  url: VIDEOS_URL,
                }}
              />
              {featuredVideosData?.data?.media ? <DzSplit {...featuredVideosData} /> : null}
            </section>
          ) : null}

          {featuredPodcast ? (
            <section>
              <ContainerTitle
                title={FEATURED_PODCAST}
                type={DzTitleMoleculeTypes.MOLECULE}
                titleType={TITLE_TYPES.H2}
                linkCTA={{
                  text: LISTEN_MORE_PODCAST,
                  linkElement: 'a',
                  url: PODCAST_URL,
                }}
              />
              <DzSplit {...featuredPodcastData} />
            </section>
          ) : null}

          {books && books.isCarousel
            ? renderCarousel(
                books,
                CARD_TYPES.CONTENT,
                {title: VIEW_ALL_TITLE, url: BOOKS_URL},
                'featured-books'
              )
            : renderSplit(books)}

          {articles ? (
            <section>
              <ContainerTitle
                title={NEWS_AND_PRESS_HIGHLIGHTS}
                type={DzTitleMoleculeTypes.MOLECULE}
                titleType={TITLE_TYPES.H2}
              />

              <DzGridColumns>
                {articlesGrid?.map((article, key) => {
                  return (
                    <DzColumn key={`article-${key}`} className="mb-5" span={4}>
                      <article>
                        <DzCard
                          type={CARD_TYPES.CONTENT}
                          data={{...article, size: CardSizes['4col']}}
                        />
                      </article>
                    </DzColumn>
                  )
                })}
              </DzGridColumns>
            </section>
          ) : null}
          {mailingListInterstitial ? (
            <div className="-mx-5">
              <DzInterstitial {...interstitialData} />
            </div>
          ) : null}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
