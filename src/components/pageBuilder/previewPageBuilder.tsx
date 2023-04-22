import {FC} from 'react'

import {PageBuilder} from '@/components/pageBuilder'
import {usePreview} from '@/sanity/preview'

interface PreviewPageBuilderProps {
  query: string
  params?: any
}

export const PreviewPageBuilder: FC<PreviewPageBuilderProps> = ({query, params = {}}) => {
  const data = usePreview(null, query, params)
  if (Array.isArray(data)) {
    const [previewData = {}] = data
    const {components} = previewData
    return <PageBuilder components={components} />
  } else {
    const {components} = data
    return <PageBuilder components={components} />
  }
}

export default PreviewPageBuilder
