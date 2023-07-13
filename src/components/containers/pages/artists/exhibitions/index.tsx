import {DzColumn, DzComplexGrid, TITLE_SIZES} from '@zwirner/design-system'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'
import {ContainerTitle} from '@/components/containers/title/ContainerTitle'

import {mapCardsGrid} from './mapper'

interface PageContainerProps {
  data: any
}

const ArtistExhibitionsPageContainer = ({data}: PageContainerProps) => {
  const parentPath = data?.artistSlug
  const parentPageTitle = data?.artistFullName
  const complexGridCards = mapCardsGrid(data?.exhibitions)
  const title = `EXHIBITIONS: ${parentPageTitle}`

  return (
    <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <DzColumn span={12}>
        <ContainerTitle title={title} titleSize={TITLE_SIZES.XL} />
        <FullWidthFlexCol>
          <DzComplexGrid cards={complexGridCards} />
        </FullWidthFlexCol>
      </DzColumn>
    </ArtistsPageLayout>
  )
}

export default ArtistExhibitionsPageContainer
