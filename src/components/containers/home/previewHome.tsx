import {FC} from 'react'

import {HomeContainer} from './index'
import {usePreview} from '@/sanity/preview'

interface PreviewHomeProps {
  query: string
  params?: any
}

export const PreviewHome: FC<PreviewHomeProps> = ({query, params = {}}) => {
  const data = usePreview(null, query, params)

  const [previewData] = data ?? []
  return <HomeContainer data={previewData} />
}

export default PreviewHome
