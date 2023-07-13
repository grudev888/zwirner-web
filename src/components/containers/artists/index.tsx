import {DzColumn, DzInterstitial, DzList} from '@zwirner/design-system'
import {FC} from 'react'

import {ARTISTS} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

import {interstitialMap, mapListItems} from './mapper'

interface ArtistsContainerProps {
  data: any
}

export const ArtistsContainer: FC<ArtistsContainerProps> = ({data}) => {
  const {pageInfo, artistPages} = data ?? {}
  const [pagesInfoData] = pageInfo ?? []
  const listItems = mapListItems(artistPages)
  const interstitialData = interstitialMap(pagesInfoData?.interstitial)
  return (
    <DzColumn span={12}>
      <ContainerTitle title={ARTISTS} />
      <FullWidthFlexCol>
        <DzList list={listItems} stickyOffset="3.75rem" sort />
        <DzInterstitial {...interstitialData} />
      </FullWidthFlexCol>
    </DzColumn>
  )
}
