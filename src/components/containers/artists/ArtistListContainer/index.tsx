import {DzColumn} from '@zwirner/design-system'
import {useRouter} from 'next/router'

import {ARTISTS} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {DzInterstitial} from '@/components/wrappers/DzInterstitialWrapper'
import {DzList} from '@/components/wrappers/DzListWrapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {mapListItems} from './mapper'

type ArtistsListContainerProps = {
  data: any
}

export const ArtistsListContainer = ({data}: ArtistsListContainerProps) => {
  const router = useRouter()
  const {pageInfo, artistPages} = data ?? {}
  const [pagesInfoData] = pageInfo ?? []
  const listItems = mapListItems(artistPages)
  const interstitialData = dzInterstitialOverrides(pagesInfoData?.interstitial, router)

  return (
    <DzColumn span={12}>
      <ContainerTitle title={ARTISTS} />
      <FullWidthFlexCol>
        <DzList list={listItems} stickyOffset="3.75rem" sort />
        {interstitialData ? <DzInterstitial {...interstitialData} /> : null}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
