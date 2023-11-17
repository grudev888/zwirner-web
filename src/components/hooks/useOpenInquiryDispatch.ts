import {InquireFormContextData, INQUIRY_CATEGORIES, InquiryCategory} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

import {
  INQUIRE,
  INTERESTED_IN,
  PLEASE_PROVIDE_YOUR_CONTACT,
  PLEASE_PROVIDE_YOUR_CONTACT_SHORT,
  THIS_ARTWORK,
  TO_LEARN_MORE_ABOUT,
  TO_LEARN_MORE_ABOUT_AVAILABLE_WORKS_EXTENDED,
  WANT_TO_KNOW_MORE,
} from '@/common/constants/commonCopies'
import {INQUIRE_HASH_KEY} from '@/components/hooks/useHashRoutedInquiryModal'
import {CTAClickEvent} from '@/events/CTAClickEvent'
import {CtaActions} from '@/sanity/types'

export interface InquireModalProps {
  contextData?: InquireFormContextData
  inquiryCategory: InquiryCategory
  subtitle: string
  title: string
  useAnchor?: boolean
}

export const useOpenInquiryDispatch = (inquireModalProps: InquireModalProps) => {
  const {asPath} = useRouter()

  useEffect(() => {
    if (asPath.includes(`#${INQUIRE_HASH_KEY}`)) {
      window.document.dispatchEvent(CTAClickEvent(CtaActions.INQUIRE, inquireModalProps))
    }
    // eslint-disable-next-line
  }, [])
}

export const createInquireModalExhibitionProps = (
  exhibition: Record<string, any>
): InquireModalProps => {
  const {title, subtitle} = exhibition
  const exhibitionTitle = `${title}${subtitle ? `: ${subtitle}` : ''}`

  return {
    contextData: {
      ctaText: INQUIRE,
      id: exhibition._id,
      title: exhibition.title,
    },
    useAnchor: true,
    inquiryCategory: INQUIRY_CATEGORIES.GENERAL,
    subtitle: `${TO_LEARN_MORE_ABOUT} ${exhibitionTitle}, ${PLEASE_PROVIDE_YOUR_CONTACT}`,
    title: WANT_TO_KNOW_MORE,
  }
}

export const createInquireModalArtistProps = (artist: Record<string, any>): InquireModalProps => {
  return {
    contextData: {
      ctaText: 'Inquire',
      id: artist.id,
      title: artist.fullName,
    },
    inquiryCategory: INQUIRY_CATEGORIES.GENERAL,
    useAnchor: true,
    subtitle: `${TO_LEARN_MORE_ABOUT} ${artist.fullName}, ${PLEASE_PROVIDE_YOUR_CONTACT_SHORT}`,
    title: INQUIRE,
  }
}

export const createInquireModalArtworkProps = (artwork: Record<string, any>): InquireModalProps => {
  const [mainArtist] = artwork?.artists ?? []
  const {fullName} = mainArtist ?? {}

  return {
    contextData: {
      ctaText: 'Inquire',
      id: artwork?._id,
      title: fullName || 'this artist',
      artwork,
    },
    useAnchor: true,
    inquiryCategory: INQUIRY_CATEGORIES.ARTWORK,
    subtitle: `${TO_LEARN_MORE_ABOUT} ${fullName}, ${PLEASE_PROVIDE_YOUR_CONTACT_SHORT}`,
    title: `${INTERESTED_IN} ${mainArtist?.fullName || THIS_ARTWORK}?`,
  }
}

export const createInquireModalGeneralProps = (): InquireModalProps => {
  return {
    inquiryCategory: INQUIRY_CATEGORIES.GENERAL,
    subtitle: TO_LEARN_MORE_ABOUT_AVAILABLE_WORKS_EXTENDED,
    title: INQUIRE,
  }
}
