import {
  CARD_TYPES,
  CardSizes,
  DzColumn,
  DzGridColumns,
  DzTitle,
  LINK_VARIANTS,
  TEXT_LINK_SIZES,
  TITLE_TYPES,
  useIsSmallWindowSize,
} from '@zwirner/design-system'
import cn from 'classnames'

import {DOWNLOAD_PRESS_RELEASE} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import PageBuilder from '@/components/pageBuilder'
import {showInterstitialSection} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {DzCard} from '@/components/wrappers/DzCardWrapper'
import {DzLink} from '@/components/wrappers/DzLinkWrapper'
import {DzPortableText} from '@/components/wrappers/DzPortableTextWrapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {builder} from '@/sanity/imageBuilder'

import styles from './article.module.css'
import {ArticleHeader} from './articleHeader'
import {articleDatesMapper, articlesGridMap, locationTitleMapper} from './mapper'

type ArticleContainerProps = {
  data: any
}

export const ArticleContainer = ({data}: ArticleContainerProps) => {
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
  const locationProps = locationTitleMapper(location)
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
                normal: cn(styles.articleXSpacing),
              }}
              builder={builder}
            />
          ) : null}
          {pdfURL ? (
            <DzLink
              className={cn(styles.downloadLink, styles.articleXSpacing)}
              href={pdfURL}
              openNewTab
              variant={LINK_VARIANTS.TEXT}
            >
              {DOWNLOAD_PRESS_RELEASE}
            </DzLink>
          ) : null}
        </article>

        {showInterstitialSection(interstitial) ? <PageBuilder components={[interstitial]} /> : null}

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
