import {FC} from 'react'

import {usePreview} from '@/sanity/preview'

import {HomeContainer} from './index'

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
