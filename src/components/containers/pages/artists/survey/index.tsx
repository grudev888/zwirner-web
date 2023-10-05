import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'

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
    <BackNavPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <AvailableArtworksContainer data={pageData} />
    </BackNavPageLayout>
  )
}

export default ArtistSurveyPageContainer
