import {ARTISTS_PRESS_URL} from '@/common/constants/commonCopies'
import {ArticleContainer} from '@/components/containers/articles/article'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'

interface PageContainerProps {
  data: any
}

const ArtistArticlePressContainer = ({data}: PageContainerProps) => {
  const {artistPageData} = data ?? {}
  const {title, parentUrl} = artistPageData ?? {}

  return (
    <ArtistsPageLayout parentPageName={title} parentPath={`${parentUrl}${ARTISTS_PRESS_URL}`}>
      <ArticleContainer data={data} />
    </ArtistsPageLayout>
  )
}

export default ArtistArticlePressContainer
