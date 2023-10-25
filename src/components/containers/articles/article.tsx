import {
  CARD_TYPES,
  CardSizes,
  DzCard,
  DzColumn,
  DzGridColumns,
  DzInterstitial,
  DzTitle,
  LINK_VARIANTS,
  TEXT_LINK_SIZES,
  TITLE_TYPES,
  useIsSmallWindowSize,
} from '@zwirner/design-system'
import cn from 'classnames'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {FC} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {DzLink} from '@/components/wrappers/DzLinkWrapper'
import {DzPortableText} from '@/components/wrappers/DzPortableText'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {builder} from '@/sanity/imageBuilder'

import styles from './article.module.css'
import {ArticleHeader} from './articleHeader'
import {articleDatesMapper, articlesGridMap, locationTitleMapper} from './mapper'

interface ArticleContainerProps {
  data: any
}

export const ArticleContainer: FC<ArticleContainerProps> = ({data}) => {
  const {
    title,
    subtitle, // note that subtitle is currently "Secondary Title" in schema
    body,
    interstitial,
    articles,
    pdfURL,
    location,
    publishDate,
    displayDate,
    externalURL,
    header,
    image,
  } = data ?? {}
  const router = useRouter()
  const locationProps = locationTitleMapper(location)
  const interstitialData = dzInterstitialOverrides(interstitial, router)
  const articlesGrid = articlesGridMap(articles)
  const articleDates = displayDate
    ? {
        title: subtitle || 'Date',
        subtitle: displayDate,
        titleType: TITLE_TYPES.P,
      }
    : articleDatesMapper(publishDate, subtitle || 'Date')
  const isSmall = useIsSmallWindowSize()

  if (articleDates && externalURL) {
    articleDates.title = (
      <DzLink href={externalURL} textLinkSize={isSmall ? TEXT_LINK_SIZES.MD : TEXT_LINK_SIZES.LG}>
        {articleDates.title}
      </DzLink>
    )
  }

  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} fullLeftContainer />
      <FullWidthFlexCol>
        <ArticleHeader data={{header, image}} />
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
                normal: cn(styles.articleXSpacing ?? '', styles.paragraphBottomMargin ?? ''),
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

        {interstitialData ? <DzInterstitial {...interstitialData} /> : null}

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
