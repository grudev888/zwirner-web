import {
  CARD_TYPES,
  CardSizes,
  DzCard,
  DzColumn,
  DzGridColumns,
  DzHero,
  DzInterstitial,
  DzLink,
  DzTitle,
  LINK_VARIANTS,
  TITLE_TYPES,
} from '@zwirner/design-system'
import cn from 'classnames'
import {FC} from 'react'

import {DzPortableText} from '@/common/components/portableText'

import styles from './article.module.css'
import {
  articlesGridMap,
  eventDatesMapper,
  heroMapper,
  interstitialMap,
  locationTitleMapper,
} from './mapper'

interface ArticleContainerProps {
  data: any
}

export const ArticleContainer: FC<ArticleContainerProps> = ({data}) => {
  const {title, body, image, interstitial, articles, pdfURL, location, event} = data
  const locationProps = locationTitleMapper(location)
  const eventDates = eventDatesMapper(event)
  const interstitialData = interstitialMap(interstitial)
  const articlesGrid = articlesGridMap(articles)
  const heroData = heroMapper({...image, title})
  return (
    <DzColumn span={12}>
      <div className={styles.articleContainer}>
        <DzHero
          className={styles.heroContainer}
          items={[heroData]}
          primaryTitleProps={{titleType: TITLE_TYPES.H1}}
        />

        <article>
          {location ? (
            <DzTitle
              {...locationProps}
              className={cn(styles.infoTitleContainer, styles.articleXSpacing)}
              classNameTitle={styles.infoTitle}
              classNameSubtitle={styles.infoTitle}
            />
          ) : null}
          {event ? (
            <DzTitle
              {...eventDates}
              className={cn(styles.infoTitleContainer, styles.articleXSpacing)}
              classNameTitle={styles.infoTitle}
              classNameSubtitle={styles.infoTitle}
            />
          ) : null}
          {body ? (
            <DzPortableText
              portableProps={{value: body}}
              customStyles={{
                normal: styles.articleXSpacing,
              }}
            />
          ) : null}
          {pdfURL ? (
            <DzLink
              className={cn(styles.downloadLink, styles.articleXSpacing)}
              href={pdfURL}
              openNewTab
              variant={LINK_VARIANTS.TEXT}
            >
              Download Press Release
            </DzLink>
          ) : null}
        </article>

        {interstitial ? (
          <div className={styles.interstitial}>
            <DzInterstitial {...interstitialData} />
          </div>
        ) : null}

        {articles ? (
          <section>
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
      </div>
      <div className={styles.spacer} />
    </DzColumn>
  )
}
