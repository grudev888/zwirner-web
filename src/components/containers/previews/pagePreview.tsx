import {PreviewSuspense} from 'next-sanity/preview'
import {FC, Fragment} from 'react'

import {SEOComponent} from '@/common/components/seo/seo'
import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import {HomeContainer} from '@/components/containers/home'
import {usePreview} from '@/sanity/preview'

export const PREVIEW_PAGE_TYPE = {
  HOME: 'home',
  AVAILABLE_WORKS: 'available-works',
}
export const PREVIEW_PAGE_TYPE_NAMES = [
  PREVIEW_PAGE_TYPE.HOME,
  PREVIEW_PAGE_TYPE.AVAILABLE_WORKS,
] as const

export type PreviewPageType = (typeof PREVIEW_PAGE_TYPE_NAMES)[number]

interface PreviewPageProps {
  seo: any
  query: string
  params?: any
  type: PreviewPageType
}

const containerPerType = {
  [PREVIEW_PAGE_TYPE.HOME]: (data: any) => {
    return <HomeContainer data={data} />
  },
  [PREVIEW_PAGE_TYPE.AVAILABLE_WORKS]: (data: any) => {
    return <AvailableArtworksContainer data={data} />
  },
}

interface ContainerDataProps {
  query: string
  params?: any
  type: PreviewPageType
}

const ContainerData: FC<ContainerDataProps> = ({query, params = {}, type}) => {
  const data = usePreview(null, query, params)
  const [previewData] = data ?? []
  const container = containerPerType?.[type]?.(previewData) ?? <Fragment />

  return <>{container}</>
}

export const PreviewPage: FC<PreviewPageProps> = ({seo, query, params = {}, type}) => {
  return (
    <>
      <SEOComponent data={seo} />
      <PreviewSuspense fallback="Loading...">
        <ContainerData query={query} params={params} type={type} />
      </PreviewSuspense>
    </>
  )
}

export default PreviewPage
