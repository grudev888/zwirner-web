import {InquireFormContextData, INQUIRY_TYPES, InquiryType} from '@zwirner/design-system'
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

interface InquireModalProps {
  inquireModalProps: {
    contextData: InquireFormContextData
    inquiryType: InquiryType
    subtitle: string
    title: string
  }
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

export const createInquireModalExhibitionProps = (exhibition: Record<string, any>) => {
  const {title, subtitle} = exhibition
  const exhibitionTitle = `${title}${subtitle ? `: ${subtitle}` : ''}`

  return {
    inquireModalProps: {
      contextData: {
        ctaText: INQUIRE,
        id: exhibition._id,
        inquiryType: INQUIRY_TYPES.EXHIBITION,
        title: exhibition.title,
      },
      inquiryType: INQUIRY_TYPES.EXHIBITION,
      subtitle: `${TO_LEARN_MORE_ABOUT} ${exhibitionTitle}, ${PLEASE_PROVIDE_YOUR_CONTACT}`,
      title: WANT_TO_KNOW_MORE,
    },
  }
}

export const createInquireModalArtistProps = (artist: Record<string, any>) => {
  return {
    inquireModalProps: {
      contextData: {
        ctaText: 'Inquire',
        id: artist.id,
        title: artist.fullName,
        inquiryType: INQUIRY_TYPES.ARTIST,
      },
      inquiryType: INQUIRY_TYPES.ARTIST,
      subtitle: `${TO_LEARN_MORE_ABOUT} ${artist.fullName}, ${PLEASE_PROVIDE_YOUR_CONTACT_SHORT}`,
      title: INQUIRE,
    },
  }
}

export const createInquireModalArtworkProps = (artwork: Record<string, any>) => {
  const [mainArtist] = artwork?.artists ?? []
  const {fullName} = mainArtist ?? {}

  return {
    inquireModalProps: {
      contextData: {
        ctaText: 'Inquire',
        id: artwork?._id,
        title: fullName || 'this artist',
        inquiryType: INQUIRY_TYPES.AVAILABLE_ARTWORKS,
        artwork,
      },
      inquiryType: INQUIRY_TYPES.AVAILABLE_ARTWORKS,
      subtitle: `${TO_LEARN_MORE_ABOUT} ${fullName}, ${PLEASE_PROVIDE_YOUR_CONTACT_SHORT}`,
      title: `${INTERESTED_IN} ${mainArtist?.fullName || THIS_ARTWORK}?`,
    },
  }
}

export const createInquireModalGeneralProps = () => {
  return {
    inquireModalProps: {
      inquiryType: INQUIRY_TYPES.GENERAL,
      subtitle: TO_LEARN_MORE_ABOUT_AVAILABLE_WORKS_EXTENDED,
      title: INQUIRE,
    },
  }
}
