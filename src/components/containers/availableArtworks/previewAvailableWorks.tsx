import {FC} from 'react'

import {AvailableArtworksContainer} from './index'
import {usePreview} from '@/sanity/preview'

interface PreviewAvailableWorksProps {
  query: string
  params?: any
}

export const PreviewAvailableWorks: FC<PreviewAvailableWorksProps> = ({query, params = {}}) => {
  const data = usePreview(null, query, params)

  const [previewData] = data ?? []
  return <AvailableArtworksContainer data={previewData} />
}

export default PreviewAvailableWorks
