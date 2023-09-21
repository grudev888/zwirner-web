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
import Image from 'next/image'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {DzPortableText} from '@/components/wrappers/DzPortableText'
import {builder} from '@/sanity/imageBuilder'

import styles from './article.module.css'
import {articleDatesMapper, articlesGridMap, heroMapper, locationTitleMapper} from './mapper'

interface ArticleContainerProps {
  data: any
}

export const ArticleContainer: FC<ArticleContainerProps> = ({data}) => {
  const {title, body, interstitial, articles, pdfURL, location, publishDate, displayDate} =
    data ?? {}
  const locationProps = locationTitleMapper(location)

  const articleDates = displayDate
    ? {
        title: 'Date',
        subtitle: displayDate,
        titleType: TITLE_TYPES.P,
      }
    : articleDatesMapper(publishDate)

  const interstitialData = dzInterstitialOverrides(interstitial)
  const articlesGrid = articlesGridMap(articles)
  const heroData = heroMapper({...data, title})

  return (
    <DzColumn span={12}>
      <FullWidthFlexCol>
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
          {articleDates ? (
            <DzTitle
              {...articleDates}
              className={cn(styles.infoTitleContainer, styles.articleXSpacing)}
              classNameTitle={styles.infoTitle}
              classNameSubtitle={styles.infoTitle}
            />
          ) : null}
          {body ? (
            <DzPortableText
              portableProps={{value: body}}
              customStyles={{
                normal: styles.articleXSpacing ?? '',
              }}
              builder={builder}
              ImgElement={Image}
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

        {interstitial ? <DzInterstitial {...interstitialData} /> : null}

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
      </FullWidthFlexCol>
      <div className={styles.spacer} />
    </DzColumn>
  )
}
