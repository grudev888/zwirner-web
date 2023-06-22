import {FC, Fragment} from 'react'
import {
  CARD_TYPES,
  DzCard,
  DzCarousel,
  DzColumn,
  DzEditorial,
  DzEditorialProps,
  DzForm,
  DzInterstitial,
  DzMedia,
  DzMediaProps, TITLE_TYPES
} from '@zwirner/design-system'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'
import {
  bodyDataMap,
  editorialSectionMap,
  featuredMediaMap,
  formSectionMap,
  headerImageMap,
  interstitialMap,
  mapCarouselCards,
  mapFooterInterstitial,
} from './mapper'

import styles from './consignments.module.css'

interface ConsignmentsContainerProps {
  data: any
}

export const ConsignmentsContainer: FC<ConsignmentsContainerProps> = ({data}) => {
  const {
    title,
    headerMedia,
    aboutText,
    consignmentForm,
    featuredMedia,
    interstitial,
    body,
    bodyCarousel,
    footerInterstitial,
  } = data

  const mediaProps = headerImageMap(headerMedia)
  const editorialProps = editorialSectionMap(aboutText)
  const formProps = formSectionMap(consignmentForm)
  const featuredMediaProps = featuredMediaMap(featuredMedia)
  const interstitialProps = interstitialMap(interstitial)
  const bodyData = bodyDataMap(body)
  const carouselCards = mapCarouselCards(bodyCarousel)
  const footerInterstitialData = mapFooterInterstitial(footerInterstitial)

  const renderCarousel = (data: any) => (
    <DzColumn span={12} className={styles.fullSection}>
      <DzCarousel>
        {data?.map((card: any) => (
          <div className="w-full" key={card.id}>
            <DzCard data={card} type={CARD_TYPES.CONTENT} />
          </div>
        ))}
      </DzCarousel>
    </DzColumn>
  )

  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} titleType={TITLE_TYPES.H1} />
      <FullWidthFlexCol>
        <DzMedia imgClass={styles.mediaImage} {...mediaProps} />
        <DzEditorial {...editorialProps} />
        <DzForm {...formProps} onSubmit={() => null} />
        <DzMedia imgClass={styles.mediaImage} {...featuredMediaProps} />
        <DzInterstitial {...interstitialProps} />
        {bodyData?.map(
          (subsection: {
            id: string
            mediaProps: DzMediaProps
            editorialProps: DzEditorialProps
          }) => {
            const {id, mediaProps, editorialProps} = subsection
            return (
              <Fragment key={id}>
                <DzMedia imgClass={styles.mediaImage} {...mediaProps} />
                <DzEditorial {...editorialProps} />
              </Fragment>
            )
          }
        )}
        {carouselCards ? renderCarousel(carouselCards) : null}
        <DzInterstitial {...footerInterstitialData} />
        <div className={styles.spacer} />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
