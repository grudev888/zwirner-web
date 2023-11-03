import {DzColumn} from '@zwirner/design-system'

import {ARTISTS} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import PageBuilder from '@/components/pageBuilder'
import {showInterstitialSection} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {DzList} from '@/components/wrappers/DzListWrapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {mapListItems} from './mapper'

type ArtistsListContainerProps = {
  data: any
}

export const ArtistsListContainer = ({data}: ArtistsListContainerProps) => {
  const {pageInfo, artistPages} = data ?? {}
  const [pagesInfoData] = pageInfo ?? []
  const listItems = mapListItems(artistPages)

  return (
    <DzColumn span={12}>
      <ContainerTitle title={ARTISTS} />
      <FullWidthFlexCol>
        <DzList list={listItems} stickyOffset="3.125rem" sort />
        {showInterstitialSection(pagesInfoData?.interstitial) ? (
          <PageBuilder components={[pagesInfoData?.interstitial]} />
        ) : null}
      </FullWidthFlexCol>
    </DzColumn>
  )
}
