import {DzColumn} from '@zwirner/design-system'
import {FC} from 'react'

import {SELECTED_PRESS} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import PageBuilder from '@/components/pageBuilder'
import {showInterstitialSection} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {showGridSection} from '@/components/pageBuilder/GridMolecule/gridMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface PressContainerProps {
  data: any
}

export const PressContainer: FC<PressContainerProps> = ({data: queryData}) => {
  const [data] = queryData ?? []
  const {artist, title: parentPageName, pressSubpage, pressInterstitialSubpage, slug} = data ?? {}
  const {fullName} = artist ?? {}

  return (
    <>
      <BackNavPageLayout parentPageName={parentPageName} parentPath={slug?.current}>
        <DzColumn span={12}>
          <ContainerTitle title={`${SELECTED_PRESS}${fullName ? `: ${fullName}` : ''}`} />
          <FullWidthFlexCol>
            {/* Page Builder GRID for guide items*/}
            {showGridSection(pressSubpage) ? <PageBuilder components={[pressSubpage]} /> : null}

            {/* Page Builder INTERSTITIAL for exhibitions*/}
            {showInterstitialSection(pressInterstitialSubpage) ? (
              <PageBuilder components={[pressInterstitialSubpage]} />
            ) : null}
          </FullWidthFlexCol>
        </DzColumn>
      </BackNavPageLayout>
    </>
  )
}
