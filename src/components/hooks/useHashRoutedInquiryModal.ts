import {INQUIRY_CATEGORIES, INQUIRY_TYPES, InquiryType} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import {useRef, useState} from 'react'

import {INQUIRE} from '@/common/constants/commonCopies'
import {ErrorType, GTMErrorMessageEvent} from '@/common/utils/gtm/GTMErrorMessageEvent'
import {
  gtmInquiryFormStartedEvent,
  gtmInquiryFormSubmitEvent,
  gtmInquiryFormViewEvent,
} from '@/common/utils/gtm/gtmInquiryFormEvent'
import {captchaInitObserver, removeCaptchaObserver} from '@/common/utils/recaptcha/observer'
import {InquireModalProps} from '@/components/hooks/useOpenInquiryDispatch'
import {useLocation} from '@/forms/api/useLocation'
import {builder} from '@/sanity/imageBuilder'
import {createRandomUUID} from '@/sanity/uuid'
import {sendInquiry} from '@/services/inquireService'
import {portableTextToText} from '@/utils/sanity/portableTextToText'

export const INQUIRE_HASH_KEY = 'inquire'
export const ARTWORK_ID_KEY = 'artworkId'

const FORM_ID_INQUIRY = 'inquiry'

const PATHNAMES_TO_INQUIRY_TYPES: Record<string, InquiryType> = {
  news: INQUIRY_TYPES.ARTICLE,
  artists: INQUIRY_TYPES.ARTIST,
  artworks: INQUIRY_TYPES.ARTWORKS,
  'available-artworks': INQUIRY_TYPES.AVAILABLE_WORKS,
  collect: INQUIRY_TYPES.COLLECT,
  exhibitions: INQUIRY_TYPES.EXHIBITION,
  home: INQUIRY_TYPES.HOME,
  stories: INQUIRY_TYPES.STORIES,
  'utopia-editions': INQUIRY_TYPES.UTOPIA_EDITIONS,
  other: INQUIRY_TYPES.OTHER,
}

export const artworkToPayloadAdapter = (artwork: any, status?: string) => {
  if (!artwork) {
    return
  }
  const {_id, artworkType, artists, dimensions, inventoryId, title, photos, dateSelection, price} =
    artwork
  const firstAsset = photos?.[0]?.image
  const image = firstAsset ? builder.image(firstAsset).url() : ''
  const payload: Record<string, any> = {
    artistFullName: artists?.[0]?.fullName || '',
    artworkType: artworkType || '',
    dimensions: portableTextToText(dimensions),
    id: _id,
    image: image || '',
    inventoryId: inventoryId || '',
    status: status || '',
    title,
    year: dateSelection?.year || '',
  }

  if (price) {
    payload.price = price
  }
  return payload
}

export const useHashRoutedInquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {asPath, replace, pathname} = useRouter()
  const recaptchaRef = useRef<HTMLFormElement>()
  const {data: location} = useLocation()
  const [inquireModalProps, setInquireModalProps] = useState<InquireModalProps>()
  const {contextData, subtitle, title = INQUIRE} = inquireModalProps ?? {}
  const {artwork, ctaText} = contextData ?? {}
  const onClose = () => {
    const {pathname} = window.location

    setIsOpen(false)
    replace({pathname, hash: ''}, undefined, {scroll: false})
  }
  const openInquireModal = ({
    inquireModalProps,
    options,
  }: {
    inquireModalProps: InquireModalProps
    options: any
  }) => {
    const {contextData, inquiryCategory} = inquireModalProps
    const {pathname, search, hash} = window.location

    if (options?.useAnchor && !hash.includes(`#${INQUIRE_HASH_KEY}`)) {
      replace({
        pathname,
        query: search,
        hash:
          inquiryCategory === INQUIRY_CATEGORIES.ARTWORK && contextData?.id
            ? `${INQUIRE_HASH_KEY}?${ARTWORK_ID_KEY}=${contextData.id}`
            : 'inquire',
      })
    }

    gtmInquiryFormViewEvent(contextData?.artwork)
    setInquireModalProps(inquireModalProps)
    setIsOpen(true)
  }
  const onDirty = () => gtmInquiryFormStartedEvent(artwork)
  const onSubmit = async (formValues: Record<string, any>) => {
    // special paths like /collect have a pathname of '/[..slug]' so we must use asPath
    // but a few asPath instances have #inquire like /exhibitions/xyz#inquire so we use pathname
    const path = pathname.includes('...slug') ? asPath : pathname
    const inquiryType =
      pathname === '/'
        ? PATHNAMES_TO_INQUIRY_TYPES['home']
        : PATHNAMES_TO_INQUIRY_TYPES[path.split('/')?.[1] || 'other']
    const {inquiryCategory} = inquireModalProps ?? {}

    // TODO check result of recaptcha before submitting form
    const observer = captchaInitObserver()
    await recaptchaRef?.current?.executeAsync()
    removeCaptchaObserver(observer)
    gtmInquiryFormSubmitEvent(artwork, formValues?.email)

    const inquiryPayload: Record<string, any> = {
      ...formValues,
      id: createRandomUUID(),
      currentUrl: window.location.href,
      timestamp: new Date().getTime(),
      formId: FORM_ID_INQUIRY,
      artwork: artworkToPayloadAdapter(artwork, ctaText),
      ctaText: ctaText || 'inquire',
      inquiryType,
      inquiryCategory: inquiryCategory || INQUIRY_CATEGORIES.GENERAL,
      phone: formValues?.phone || '',
      pageTitle: document.title || '',
      location: {
        city: location?.city || 'city unavailable',
        region: location?.region || 'region unavailable',
        country: location?.country || 'country unavailable',
      },
    }

    if (inquiryType === INQUIRY_TYPES.ARTIST) {
      inquiryPayload.artistFullName = contextData?.title
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
