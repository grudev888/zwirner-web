import {
  CARD_TYPES,
  CardSizes,
  carouselSizeToCardSize,
  DzCard,
  DzCarousel,
  DzCarouselCardSize,
  DzColumn,
  DzEditorial,
  DzEditorialProps,
  DzForm,
  DzInterstitial,
  DzMedia,
  DzMediaProps,
} from '@zwirner/design-system'
import {FC, Fragment} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

import styles from './consignments.module.css'
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
  const carouselCards = mapCarouselCards(bodyCarousel?.items)
  const footerInterstitialData = mapFooterInterstitial(footerInterstitial)

  const renderCarousel = (data: any, size: DzCarouselCardSize = DzCarouselCardSize.L) => (
    <DzColumn span={12} className={styles.fullSection}>
      <DzCarousel size={size}>
        {data?.map((card: any) => (
          <div className="w-full" key={card.id}>
            <DzCard
              data={{...card, size: [CardSizes['10col'], carouselSizeToCardSize[size]]}}
              type={CARD_TYPES.CONTENT}
            />
          </div>
        ))}
      </DzCarousel>
    </DzColumn>
  )

  return (
    <DzColumn span={12}>
      <ContainerTitle title={title} />
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
        {carouselCards ? renderCarousel(carouselCards, bodyCarousel?.size) : null}
        <DzInterstitial {...footerInterstitialData} />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
