import {DzColumn, TITLE_SIZES} from '@zwirner/design-system'
import {useRouter} from 'next/router'
import queryString from 'querystring'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ARTWORK_ID_KEY} from '@/components/hooks/useHashRoutedInquiryModal'
import {
  createInquireModalArtworkProps,
  useOpenInquiryDispatch,
} from '@/components/hooks/useOpenInquiryDispatch'
import PageBuilder from '@/components/pageBuilder'
import {showGridSection} from '@/components/pageBuilder/GridMolecule/gridMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

type AvailableArtworksProps = {
  data: any
}

export const AvailableArtworksContainer = ({data}: AvailableArtworksProps) => {
  const {asPath} = useRouter()
  const inquireArtworkId = queryString.parse(asPath?.split('?')?.[1] || '')[
    ARTWORK_ID_KEY
  ] as string
  const {gridData, title} = data ?? {}
  const firstArtworkContent = gridData?.props?.grid?.find(
    ({content}: any) => content?.[0]._id === inquireArtworkId
  )

  useOpenInquiryDispatch(createInquireModalArtworkProps(firstArtworkContent?.content?.[0]))

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} fullLeftContainer />
        <FullWidthFlexCol>
          {showGridSection(gridData) ? <PageBuilder components={[gridData]} /> : null}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
