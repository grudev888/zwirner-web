import {ARTISTS_PRESS_URL} from '@/common/constants/commonCopies'
import {ArticleContainer} from '@/components/containers/articles/article'
import BackNavPageLayout from '@/components/containers/layout/pages/backNavPageLayout'

interface PageContainerProps {
  data: any
}

const ArtistArticlePressContainer = ({data}: PageContainerProps) => {
  const {artistPageData} = data ?? {}
  const {title, parentUrl} = artistPageData ?? {}

  return (
    <BackNavPageLayout parentPageName={title} parentPath={`${parentUrl}${ARTISTS_PRESS_URL}`}>
      <ArticleContainer data={data} />
    </BackNavPageLayout>
  )
}

export default ArtistArticlePressContainer
