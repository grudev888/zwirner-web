import {DzColumn, FORM_MODAL_TYPES, INQUIRY_TYPES, TITLE_SIZES} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import queryString from 'querystring'
import {FC} from 'react'

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
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {mapCardsGrid} from './mapper'

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {ssr: false}
)

interface AvailableArtworksProps {
  data: any
}

export const AvailableArtworksContainer: FC<AvailableArtworksProps> = ({data}) => {
  const {asPath} = useRouter()
  const inquireArtworkId = queryString.parse(asPath?.split('?')?.[1] || '')[
    ARTWORK_ID_KEY
  ] as string
  const {artworksGrid, title} = data ?? {}
  const {items = [], displayNumberOfResults, itemsPerRow = 1} = artworksGrid ?? {}
  const inquireFormModalProps = useHashRoutedInquiryModal({
    id: inquireArtworkId,
    artwork: items?.find(({_id}: {_id: string}) => _id === inquireArtworkId),
    title: data.artistName,
    inquiryType: INQUIRY_TYPES.AVAILABLE_ARTWORKS,
  })
  const complexGridCard = mapCardsGrid(items, inquireFormModalProps.openClickHandler)
  const artwork = items?.find(({_id}: {_id: string}) => _id === inquireArtworkId)
  const inquireFormTitle = `${INTERESTED_IN} ${artwork?.artists?.[0].fullName || THIS_ARTWORK}?`

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />
        <FullWidthFlexCol>
          <DzComplexGrid
            maxItemsPerRow={itemsPerRow}
            displayNumberOfResults={!!displayNumberOfResults}
            cards={complexGridCard}
          />
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
