import {SURVEY} from '@/common/constants/commonCopies'
import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'

interface PageContainerProps {
  data: any
}

const ArtistSurveyPageContainer = ({data}: PageContainerProps) => {
  const {artist} = data ?? {}
  const {fullName} = artist ?? {}
  const subPageData = data?.surveySubpage ?? {}
  const pageData = {
    gridData: subPageData,
    artworks: subPageData?.props?.grid?.map((component: any) => {
      const {content} = component ?? {}
      const [contentSimple] = content ?? []
      const {_id} = contentSimple ?? {}
      return {_id}
    }),
    title: `${SURVEY}${fullName ? `: ${fullName}` : ''}`,
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
