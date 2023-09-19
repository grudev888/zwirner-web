import {InquireFormContextData} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

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
  const {_id, artworkType, artists, dimensions, title, dateSelection, price} = artwork

  return {
    id: _id,
    status: 'TODO status',
    dimension: portableTextToText(dimensions),
    type: artworkType,
    dzdb_artwork_id: 'TODO dzdb_artwork_id',
    artist_name: artists?.[0]?.fullName || 'No artist name available',
    title,
    year: dateSelection?.year || 'No year available',
    image: 'TODO image',
    price: price || 'No price available',
    inventory_number: 'TODO inventory',
  }
}

export const useHashRoutedInquiryModal = (initialContextData?: InquireFormContextData) => {
  const [isOpen, setIsOpen] = useState(false)
  const {replace, pathname, query, asPath} = useRouter()
  const onClose = () => replace({pathname, query, hash: ''})
  const [contextData, setContextData] = useState<InquireFormContextData | undefined>(
    initialContextData
  )
  const openClickHandler = (contextData?: InquireFormContextData) => {
    const hash = contextData?.id
      ? `${INQUIRE_HASH_KEY}?${ARTWORK_ID_KEY}=${contextData.id}`
      : 'inquire'

    setContextData((currentData) => {
      return {...currentData, ...(contextData || {})}
    })
    replace({pathname, query, hash})
  }
  const onSubmit = async (formValues: Record<string, any>) => {
    const {artwork} = contextData ?? {}
    const inquiryPayload = {
      ...formValues,
      id: createRandomUUID(),
      currentUrl: asPath,
      timestamp: new Date().getTime(),
      formId: FORM_ID_INQUIRY,
      artwork: artworkToPayloadAdapter(artwork),
      location: {
        city: 'TODO city',
        region: 'TODO region',
        country: 'TODO country',
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
  }
}
