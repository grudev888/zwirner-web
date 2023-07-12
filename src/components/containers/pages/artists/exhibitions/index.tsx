import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'

interface PageContainerProps {
  data: any
}

const ArtistExhibitionsPageContainer = ({data}: PageContainerProps) => {
  const subPageData = data?.surveySubpage ?? {}
  const pageData = {artworksGrid: subPageData || {items: []}, title: subPageData?.title}
  const parentPath = data?.slug?.current
  const parentPageTitle = data?.title

  return (
    <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}></ArtistsPageLayout>
  )
}

export default ArtistExhibitionsPageContainer
