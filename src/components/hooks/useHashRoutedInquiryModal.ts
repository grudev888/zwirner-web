import {InquireFormContextData, INQUIRY_TYPES} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import {useRef, useState} from 'react'

import {ErrorType, GTMErrorMessageEvent} from '@/common/utils/gtm/GTMErrorMessageEvent'
import {
  gtmInquiryFormStartedEvent,
  gtmInquiryFormSubmitEvent,
  gtmInquiryFormViewEvent,
} from '@/common/utils/gtm/gtmInquiryFormEvent'
import {captchaInitObserver, removeCaptchaObserver} from '@/common/utils/recaptcha/observer'
import {useLocation} from '@/forms/api/useLocation'
import {builder} from '@/sanity/imageBuilder'
import {createRandomUUID} from '@/sanity/uuid'
import {sendInquiry} from '@/services/inquireService'
import {portableTextToText} from '@/utils/sanity/portableTextToText'

export const INQUIRE_HASH_KEY = 'inquire'
export const ARTWORK_ID_KEY = 'artworkId'

const FORM_ID_INQUIRY = 'inquiry'

const INQUIRY_TYPES_TO_INQUIRY_VALUE = {
  [INQUIRY_TYPES.ARTIST]: 'Artist Page',
  [INQUIRY_TYPES.EXHIBITION]: 'Exhibition',
  [INQUIRY_TYPES.AVAILABLE_ARTWORKS]: 'Special Pages',
}
export const artworkToPayloadAdapter = (artwork: any, status?: string) => {
  if (!artwork) {
    return
  }
  const {_id, artworkType, artists, dimensions, inventoryId, title, photos, dateSelection, price} =
    artwork
  const firstAsset = photos?.[0]?.image
  const image = firstAsset ? builder.image(firstAsset).url() : ''

  return {
    artistFullName: artists?.[0]?.fullName || '',
    artworkType: artworkType || '',
    dimensions: portableTextToText(dimensions),
    id: _id,
    image: image || '',
    inventoryId: inventoryId || '',
    price: price || '',
    status: status || '',
    title,
    year: dateSelection?.year || '',
  }
}

export const useHashRoutedInquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {replace} = useRouter()
  const [title, setTitle] = useState<string>('')
  const [subtitle, setSubtitle] = useState<string>('')
  const recaptchaRef = useRef<HTMLFormElement>()
  const {data: location} = useLocation()
  const onClose = () => {
    const {pathname} = window.location

    setIsOpen(false)
    replace({pathname, hash: ''}, undefined, {scroll: false})
  }
  const [contextData, setContextData] = useState<InquireFormContextData | undefined>()
  const {artwork, ctaText, inquiryType} = contextData ?? {}
  // TODO arg types
  const openInquireModal = ({inquiryType, title, subtitle, contextData, options}: any) => {
    const {pathname, search, hash} = window.location
    setContextData(contextData)
    setTitle(title)
    setSubtitle(subtitle)

    if (options?.useAnchor && !hash.includes(`#${INQUIRE_HASH_KEY}`)) {
      replace({
        pathname,
        query: search,
        hash:
          inquiryType === INQUIRY_TYPES.AVAILABLE_ARTWORKS && contextData?.id
            ? `${INQUIRE_HASH_KEY}?${ARTWORK_ID_KEY}=${contextData.id}`
            : 'inquire',
      })
    }
    gtmInquiryFormViewEvent(contextData?.artwork)
    setIsOpen(true)
  }
  const onDirty = () => gtmInquiryFormStartedEvent(artwork)
  const onSubmit = async (formValues: Record<string, any>) => {
    // TODO check result of recaptcha before submitting form
    const observer = captchaInitObserver()
    await recaptchaRef?.current?.executeAsync()
    removeCaptchaObserver(observer)
    gtmInquiryFormSubmitEvent(artwork, formValues?.email)

    const inquiryPayload = {
      ...formValues,
      id: createRandomUUID(),
      currentUrl: window.location.href,
      timestamp: new Date().getTime(),
      formId: FORM_ID_INQUIRY,
      artwork: artworkToPayloadAdapter(artwork, ctaText),
      ctaText: ctaText || 'inquire',
      inquiryType: INQUIRY_TYPES_TO_INQUIRY_VALUE[inquiryType!] || 'inquiry',
      phone: formValues?.phone || '',
      pageTitle: document.title || '',
      location: {
        city: location?.city || 'city unavailable',
        region: location?.region || 'region unavailable',
        country: location?.country || 'country unavailable',
      },
    }

    return sendInquiry(inquiryPayload)
      .then((result) => {
        return {isSuccess: !result?.error, error: result?.error}
      })
      .catch((error) => {
        GTMErrorMessageEvent({
          error_message: error.error.message,
          type: ErrorType.FORM,
        })
        return {isSuccess: false, error}
      })
  }

  return {
    isOpen,
    onClose,
    onDirty,
    onSubmit,
    openInquireModal,
    recaptchaRef,
    subtitle,
    title,
  }
}
