import {DzColumn, DzComplexGrid, DzInterstitial, TITLE_SIZES} from '@zwirner/design-system'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

import {interstitialMap, mapCardsGrid} from './mapper'

interface PageContainerProps {
  data: any
}

const ArtistExhibitionsPageContainer = ({data}: PageContainerProps) => {
  const parentPath = data?.slug
  const parentPageTitle = data?.artistFullName
  const complexGridCards = mapCardsGrid(data?.exhibitions)
  const title = `EXHIBITIONS: ${parentPageTitle}`
  const interstitialData = interstitialMap(data?.interstitial)

  return (
    <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <DzColumn span={12}>
        {parentPageTitle && <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />}
        <FullWidthFlexCol>
          <DzComplexGrid cards={complexGridCards} />
        </FullWidthFlexCol>
        <DzInterstitial {...interstitialData} />
      </DzColumn>
    </ArtistsPageLayout>
  )
}

export default ArtistExhibitionsPageContainer
