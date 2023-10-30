import {AVAILABLE_WORKS} from '@/common/constants/commonCopies'
import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'

interface PageContainerProps {
  data: any
}

const AWContainer = ({data}: PageContainerProps) => {
  const subPageData = data?.artworksGrid ?? {}
  const pageData = {
    gridData: subPageData,
    artworks: subPageData?.props?.grid?.map((component: any) => {
      const {content} = component ?? {}
      const [contentSimple] = content ?? []
      const {_id} = contentSimple ?? {}
      return {_id}
    }),
    title: AVAILABLE_WORKS,
  }

  return <AvailableArtworksContainer data={pageData} />
}

export default AWContainer
