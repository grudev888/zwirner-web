import {InquireFormContextData} from '@zwirner/design-system'
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

const artworkToPayloadAdapter = (artwork: any) => {
  if (!artwork) {
    return
  }
  const {_id, artworkType, artists, dimensions, inventoryId, title, photos, dateSelection, price} =
    artwork
  const firstAsset = photos?.[0]?.asset
  const image = firstAsset ? builder.image(firstAsset).url() : ''

  return {
    artistFullName: artists?.[0]?.fullName || 'Artist name unavailable',
    artworkType,
    dimensions: portableTextToText(dimensions), // dimension
    id: _id,
    image,
    inventoryId,
    price: price || 'Price unavailable',
    status: 'TODO status',
    title,
    year: dateSelection?.year || 'Year unavailable',
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

    const {artwork} = contextData ?? {}
    const inquiryPayload = {
      ...formValues,
      id: createRandomUUID(),
      currentUrl: asPath,
      timestamp: new Date().getTime(),
      formId: FORM_ID_INQUIRY,
      artwork: artworkToPayloadAdapter(artwork),
      location: {
        city: location?.city,
        region: location?.region,
        country: location?.country,
      },
    }

    return sendInquiry(inquiryPayload)
      .then((result) => {
        return result.error ? {isSuccess: false, error: result.error} : {isSuccess: true}
      })
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
