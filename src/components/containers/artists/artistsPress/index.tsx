import {DzColumn, DzInterstitial} from '@zwirner/design-system'
import dynamic from 'next/dynamic'
import {FC} from 'react'

import {SELECTED_PRESS} from '@/common/constants/commonCopies'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

const DzComplexGrid = dynamic(
  () => import('@zwirner/design-system').then((mod) => mod.DzComplexGrid),
  {
    ssr: false,
  }
)
import {guideGrid, interstitialMap} from './mapper'
interface PressContainerProps {
  data: any
}

export const PressContainer: FC<PressContainerProps> = ({data}) => {
  const {artist, title: parentPageName, pressSubpage, pressInterstitialSubpage, slug} = data ?? {}
  const {title} = pressSubpage ?? {}
  const gridData = guideGrid(pressSubpage)
  const interstitialData = interstitialMap(pressInterstitialSubpage)

  return (
    <>
      <ArtistsPageLayout parentPageName={parentPageName} parentPath={slug?.current}>
        <DzColumn span={12}>
          {title ? (
            <ContainerTitle
              title={title ?? artist?.fullName ? `${SELECTED_PRESS}: ${artist?.fullName}` : ''}
            />
          ) : null}
          <FullWidthFlexCol>
            <DzComplexGrid {...gridData} />
            <div className="-mx-5">
              <DzInterstitial {...interstitialData} />
            </div>
          </FullWidthFlexCol>
        </DzColumn>
      </ArtistsPageLayout>
    </>
  )
}
