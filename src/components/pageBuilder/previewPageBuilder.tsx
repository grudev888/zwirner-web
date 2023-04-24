import {FC} from 'react'

import {PageBuilder} from '@/components/pageBuilder'
import {homeMapper} from '@/sanity/mappers/pageBuilder/homeMapper'
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

  return <PageBuilder rows={homeMapper(dataToMap)} />
}

export default PreviewPageBuilder
