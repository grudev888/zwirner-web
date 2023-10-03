import {
  CARD_TYPES,
  CardSizes,
  carouselSizeToCardSize,
  DzCard,
  DzCarouselCardSize,
  DzColumn,
  DzEditorial,
  DzEditorialProps,
  DzForm,
  DzInterstitial,
  DzMedia,
  DzMediaProps,
  EditorialType,
} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC, Fragment, useRef} from 'react'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import RecaptchaNode from '@/components/forms/recaptchaNode'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import styles from './consignments.module.css'
import {
  bodyDataMap,
  editorialSectionMap,
  featuredMediaMap,
  formSectionMap,
  headerImageMap,
  mapCarouselCards,
} from './mapper'

const DzCarousel = dynamic(() => import('@zwirner/design-system').then((mod) => mod.DzCarousel), {
  ssr: false,
})

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
  const recaptchaRef = useRef<HTMLFormElement>()
  const mediaProps = headerImageMap(headerMedia)
  const editorialProps = editorialSectionMap(aboutText)
  const formProps = formSectionMap(consignmentForm)
  const featuredMediaProps = featuredMediaMap(featuredMedia)
  const interstitialProps = dzInterstitialOverrides(interstitial)
  const bodyData = bodyDataMap(body)
  const carouselCards = mapCarouselCards(bodyCarousel?.items)
  const footerInterstitialData = dzInterstitialOverrides(footerInterstitial)
  const onSubmitForm = async () => {
    //const token = await recaptchaRef.current?.executeAsync()
    //TODO submit form to API endpoint
  }
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
      <ContainerTitle title={title} isWide={true} />
      <FullWidthFlexCol>
        <DzMedia imgClass={styles.mediaImage} {...mediaProps} />
        <DzEditorial {...editorialProps} type={EditorialType.LEFT_BLOCK} />
        <DzForm
          {...formProps}
          onSubmit={onSubmitForm}
          recaptchaNode={<RecaptchaNode recaptchaRef={recaptchaRef} />}
        />
        <DzMedia imgClass={styles.mediaImage} {...featuredMediaProps} />
        {interstitialProps ? <DzInterstitial {...interstitialProps} /> : null}
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
                <DzEditorial {...editorialProps} type={EditorialType.LEFT_BLOCK} />
              </Fragment>
            )
          }
        )}
        {carouselCards ? renderCarousel(carouselCards, bodyCarousel?.size) : null}
        {footerInterstitialData ? <DzInterstitial {...footerInterstitialData} /> : null}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
