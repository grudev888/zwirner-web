import {DzColumn, DzComplexGrid} from '@zwirner/design-system'

import {FullWidthFlexCol} from '@/components/containers/layout/FullWidthFlexCol'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'

import {mapCardsGrid} from './mapper'

interface PageContainerProps {
  data: any
}

const ArtistExhibitionsPageContainer = ({data}: PageContainerProps) => {
  const parentPath = data?.artistSlug
  const parentPageTitle = data?.artistFullName
  const complexGridCards = mapCardsGrid(data?.exhibitions)

  return (
    <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <DzColumn span={12}>
        <FullWidthFlexCol>
          <DzComplexGrid cards={complexGridCards} />
        </FullWidthFlexCol>
      </DzColumn>
    </ArtistsPageLayout>
  )
}

export default ArtistExhibitionsPageContainer
