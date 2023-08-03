import {CARD_TYPES, DzColumn, DzInterstitial} from '@zwirner/design-system'
import {FC} from 'react'

import {dzComplexGridMapper} from '@/common/utilsMappers/components/dzComplexGrid.mapper'
import {dzInterstitialMapper} from '@/common/utilsMappers/components/dzInterstitial.mapper'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface InstallationViewsContainerProps {
  data: any
}

export const InstallationViewsContainer: FC<InstallationViewsContainerProps> = ({data}) => {
  const {title, installationViewsInterstitial, installationViews} = data ?? {}
  console.log('container data:', data)
  const interstitialData = dzInterstitialMapper({data: installationViewsInterstitial})
  const complexGridData = dzComplexGridMapper({data: installationViews, cardType: CARD_TYPES.MEDIA})
  console.log('complexGridData', complexGridData)

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={`${title}— Installation Views`} />
        <FullWidthFlexCol>
          <p>Installation view page content ...</p>
          {interstitialData && <DzInterstitial {...interstitialData} />}
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
