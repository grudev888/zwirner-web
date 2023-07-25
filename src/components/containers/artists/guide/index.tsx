import {DzColumn, DzInterstitial} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {GUIDE} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

import {guideGrid, interstitialMap} from './mapper'

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
  const interstitialData = interstitialMap(guideInterstitialSubpage)

  return (
    <>
      <ArtistsPageLayout parentPageName={parentPageName} parentPath={slug?.current}>
        <DzColumn span={12}>
          {title ? (
            <ContainerTitle
              title={title ?? artist?.fullName ? `${GUIDE}: ${artist?.fullName}` : ''}
            />
          ) : null}
          <FullWidthFlexCol>
            <DzComplexGrid {...gridData} />

            <DzInterstitial {...interstitialData} />
          </FullWidthFlexCol>
        </DzColumn>
      </ArtistsPageLayout>
    </>
  )
}
