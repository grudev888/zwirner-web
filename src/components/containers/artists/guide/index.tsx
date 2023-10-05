import {DzColumn, DzInterstitial} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {GUIDE} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'
import {dzInterstitialOverrides} from '@/components/pageBuilder/DzInterstitial/interstitialMapper'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

import {guideGrid} from './mapper'

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {ssr: false}
)

interface ArtistGuideContainerProps {
  data: any
}

export const ArtistGuideContainer: FC<ArtistGuideContainerProps> = ({data}) => {
  const {artist, title: parentPageName, guideSubpage, guideInterstitialSubpage, slug} = data ?? {}
  const {title} = guideSubpage ?? {}
  const gridData = guideGrid(guideSubpage)
  const interstitialData = dzInterstitialOverrides(guideInterstitialSubpage)
  return (
    <>
      <BackNavPageLayout parentPageName={parentPageName} parentPath={slug?.current}>
        <DzColumn span={12}>
          {title ? (
            <ContainerTitle
              title={title ?? artist?.fullName ? `${GUIDE}: ${artist?.fullName}` : ''}
            />
          ) : null}
          <FullWidthFlexCol>
            <DzComplexGrid {...gridData} />
            {interstitialData ? <DzInterstitial {...interstitialData} /> : null}
          </FullWidthFlexCol>
        </DzColumn>
      </BackNavPageLayout>
    </>
  )
}
