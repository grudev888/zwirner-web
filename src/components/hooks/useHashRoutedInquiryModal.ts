import {InquireFormContextData, INQUIRY_TYPES} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import {useEffect, useRef, useState} from 'react'

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
const artworkToPayloadAdapter = (artwork: any, status?: string) => {
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

export const useHashRoutedInquiryModal = (initialContextData?: InquireFormContextData) => {
  const [isOpen, setIsOpen] = useState(false)
  const {replace, pathname, query, asPath} = useRouter()
  const recaptchaRef = useRef<HTMLFormElement>()
  const {data: location} = useLocation()
  const onClose = () => replace({pathname, query, hash: ''})
  const [contextData, setContextData] = useState<InquireFormContextData | undefined>(
    initialContextData
  )
  const openClickHandler = (contextData?: InquireFormContextData) => {
    const hash = contextData?.id
      ? `${INQUIRE_HASH_KEY}?${ARTWORK_ID_KEY}=${contextData.id}`
      : 'inquire'

    setContextData((currentData: any) => {
      return {...currentData, ...(contextData || {})}
    })
    replace({pathname, query, hash})
  }
  const onSubmit = async (formValues: Record<string, any>) => {
    // TODO check result of recaptcha before submitting form
    await recaptchaRef?.current?.executeAsync()

    const {artwork, ctaText, inquiryType} = contextData ?? {}
    const inquiryPayload = {
      ...formValues,
      id: createRandomUUID(),
      currentUrl: asPath,
      timestamp: new Date().getTime(),
      formId: FORM_ID_INQUIRY,
      artwork: artworkToPayloadAdapter(artwork, ctaText),
      ctaText: ctaText || '',
      inquiryType: INQUIRY_TYPES_TO_INQUIRY_VALUE[inquiryType!] || '',
      phone: formValues?.phone || '',
      pageTitle: document.title || '',
      location: {
        city: location?.city || 'city unavailable',
        region: location?.region || 'region unavailable',
        country: location?.country || 'country unavailable',
      },
    }

    return sendInquiry(inquiryPayload)
      .then(() => ({isSuccess: true}))
      .catch((error) => ({isSuccess: false, error}))
  }

  useEffect(() => setIsOpen(asPath.includes(`#${INQUIRE_HASH_KEY}`)), [asPath])

  return {
    contextData,
    openClickHandler,
    onClose,
    isOpen,
    onSubmit,
    recaptchaRef,
  }
}
