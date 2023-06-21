import {
  CARD_TYPES,
  DzCard,
  DzColumn,
  DzGridColumns,
  DzInterstitial,
  DzLink,
  DzMedia,
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
  headingImageMapper,
  interstitialMap,
  locationTitleMapper,
} from './mapper'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'

interface ArticleContainerProps {
  data: any
}

export const ArticleContainer: FC<ArticleContainerProps> = ({data}) => {
  const {title, body, image, interstitial, articles, pdfURL, location, event} = data
  const locationProps = locationTitleMapper(location)
  const eventDates = eventDatesMapper(event)
  const mediaProps = headingImageMapper(image)
  const interstitialData = interstitialMap(interstitial)
  const articlesGrid = articlesGridMap(articles)
  return (
    <DzColumn span={12}>
      {image ? <DzMedia {...mediaProps} /> : null}

      <FullWidthFlexCol className={styles.articleContainer}>
        <article>
          <DzTitle
            className={styles.titlePage}
            classNameTitle={styles.h1}
            title={title}
            titleType={TITLE_TYPES.H1}
          />
          <div>
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
                variant={LINK_VARIANTS.NAV}
              >
                Download Press Release
              </DzLink>
            ) : null}
          </div>
        </article>

        {interstitial ? (
          <section>
            <DzInterstitial {...interstitialData} />
          </section>
        ) : null}
      </FullWidthFlexCol>
      {articles ? (
        <>
          <div className={styles.spacer} />
          <section>
            <DzGridColumns>
              {articlesGrid?.map((article, key) => {
                return (
                  <article key={`article-${key}`}>
                    <DzColumn className="mb-5" span={4}>
                      <DzCard type={CARD_TYPES.CONTENT} data={article} />
                    </DzColumn>
                  </article>
                )
              })}
            </DzGridColumns>
          </section>
        </>
      ) : null}
      <div className={styles.spacer} />
    </DzColumn>
  )
}
