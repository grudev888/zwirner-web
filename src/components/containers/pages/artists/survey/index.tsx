import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'

interface PageContainerProps {
  data: any
}

const ArtistSurveyPageContainer = ({data}: PageContainerProps) => {
  const subPageData = data?.surveyPage[0]?.surveySubpage ?? {}
  const pageData = {artworksGrid: subPageData || {items: []}, title: subPageData?.title}
  const parentPath = data?.surveyPage[0]?.slug?.current
  const parentPageTitle = data?.surveyPage?.[0]?.title

  return (
    <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
      <AvailableArtworksContainer data={pageData} />
    </ArtistsPageLayout>
  )
}

export default ArtistSurveyPageContainer
