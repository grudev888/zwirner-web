import {DzColumn, FORM_MODAL_TYPES, INQUIRY_TYPES, TITLE_SIZES} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import queryString from 'querystring'
import {useEffect} from 'react'

import {
  INTERESTED_IN,
  THIS_ARTWORK,
  TO_LEARN_MORE_ABOUT_THIS_ARTWORK,
} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {RecaptchaInquireFormModal} from '@/components/forms/recaptchaInquireFormModal'
import {
  ARTWORK_ID_KEY,
  useHashRoutedInquiryModal,
} from '@/components/hooks/useHashRoutedInquiryModal'
import PageBuilder from '@/components/pageBuilder'
import {showGridSection} from '@/components/pageBuilder/GridMolecule/gridMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'
import {EVENT_CTA_CLICKED} from '@/events/CTAClickEvent'
import {CtaActions} from '@/sanity/types'

type AvailableArtworksProps = {
  data: any
}

export const AvailableArtworksContainer = ({data}: AvailableArtworksProps) => {
  const {asPath} = useRouter()
  const inquireArtworkId = queryString.parse(asPath?.split('?')?.[1] || '')[
    ARTWORK_ID_KEY
  ] as string
  const {gridData, artworks, title} = data ?? {}

  const inquireFormModalProps = useHashRoutedInquiryModal({
    id: inquireArtworkId,
    artwork: artworks?.find(({_id}: {_id: string}) => _id === inquireArtworkId),
    title: data.artistName,
    inquiryType: INQUIRY_TYPES.AVAILABLE_ARTWORKS,
  })
  const artwork = artworks?.find(({_id}: {_id: string}) => _id === inquireArtworkId)
  const inquireFormTitle = `${INTERESTED_IN} ${artwork?.artists?.[0]?.fullName || THIS_ARTWORK}?`

  useEffect(() => {
    const ctaTypesToClickHandlers: Record<string, (props: any) => void> = {
      [CtaActions.INQUIRE]: (props = {}) => {
        inquireFormModalProps.openClickHandler({
          ...props,
          ctaText: 'Inquire',
          inquiryType: INQUIRY_TYPES.ARTIST,
        })
      },
    }
    const ctaClickListener = (ctaClickEvent: any) => {
      const {detail} = ctaClickEvent ?? {}
      const {ctaType, props} = detail ?? {}
      ctaTypesToClickHandlers?.[ctaType]?.(props)
    }

    if (typeof window !== undefined) {
      window.document.addEventListener(EVENT_CTA_CLICKED, ctaClickListener)
    }

    return () => {
      if (typeof window !== undefined) {
        window.document.removeEventListener(EVENT_CTA_CLICKED, ctaClickListener)
      }
    }
  }, [inquireFormModalProps])

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />
        <FullWidthFlexCol>
          {showGridSection(gridData) ? <PageBuilder components={[gridData]} /> : null}
        </FullWidthFlexCol>
      </DzColumn>
      <RecaptchaInquireFormModal
        type={FORM_MODAL_TYPES.INQUIRE}
        {...inquireFormModalProps}
        title={inquireFormTitle}
        subtitle={TO_LEARN_MORE_ABOUT_THIS_ARTWORK}
      />
    </>
  )
}
