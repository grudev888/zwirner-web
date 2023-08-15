import {DzColumn, DzInterstitial} from '@zwirner/design-system'
import {FC} from 'react'

import {dzInterstitialMapper} from '@/common/utilsMappers/components/dzInterstitial.mapper'
import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import {ContainerTitle} from '@/components/wrappers/title/ContainerTitle'

interface ExhibitionLandingContainerProps {
  data: any
}

export const ExhibitionLandingContainer: FC<ExhibitionLandingContainerProps> = ({data}) => {
  const {interstitial} = data
  const {title} = data ?? {}
  const interstitialProps = dzInterstitialMapper({data: interstitial})

  return (
    <>
      <DzColumn span={12}>
        <ContainerTitle title={title} />
        <FullWidthFlexCol>
          <DzInterstitial {...interstitialProps} />
        </FullWidthFlexCol>
      </DzColumn>
    </>
  )
}
