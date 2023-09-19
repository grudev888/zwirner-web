import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'

interface PageContainerProps {
  data: any
}

const ArtistSurveyPageContainer = ({data}: PageContainerProps) => {
  const subPageData = data?.surveySubpage ?? {}
  const pageData = {
    artworksGrid: subPageData || {items: []},
    title: subPageData?.title,
    artistName: data?.artist?.fullName,
  }
  const parentPath = data?.slug?.current
  const parentPageTitle = data?.title

  return (
    <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <AvailableArtworksContainer data={pageData} />
    </ArtistsPageLayout>
  )
}

export default ArtistSurveyPageContainer
