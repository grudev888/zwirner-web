import {FC} from 'react'

import {PageBuilder} from '@/components/pageBuilder'
import {pageBuilderMap} from '@/sanity/mappers/pageBuilder/pagebuilderMapper'
import {usePreview} from '@/sanity/preview'

interface PreviewPageBuilderProps {
  query: string
  params?: any
  isSingle?: boolean
}

export const PreviewPageBuilder: FC<PreviewPageBuilderProps> = ({
  query,
  params = {},
  isSingle = false,
}) => {
  const data = usePreview(null, query, params)
  const dataToMap = isSingle ? [data] : data

  return <PageBuilder components={pageBuilderMap(dataToMap)} />
}

export default PreviewPageBuilder
