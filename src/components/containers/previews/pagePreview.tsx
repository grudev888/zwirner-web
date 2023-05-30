import {PreviewSuspense} from 'next-sanity/preview'
import {FC, Fragment} from 'react'

import {SEOComponent} from '@/common/components/seo/seo'
import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import {CollectContainer} from '@/components/containers/collect'
import {ConsignmentsContainer} from '@/components/containers/consignments'
import {HomeContainer} from '@/components/containers/home'
import {UtopiaEditionsContainer} from '@/components/containers/utopiaEditions'
import {usePreview} from '@/sanity/preview'

export const PREVIEW_PAGE_TYPE = {
  HOME: 'home',
  AVAILABLE_WORKS: 'available-works',
  CONSIGNMENTS: 'consignments',
  UTOPIA: 'utopia-editions',
  COLLECT: 'collect',
}

export const PREVIEW_PAGE_TYPE_NAMES = [
  PREVIEW_PAGE_TYPE.HOME,
  PREVIEW_PAGE_TYPE.AVAILABLE_WORKS,
  PREVIEW_PAGE_TYPE.CONSIGNMENTS,
  PREVIEW_PAGE_TYPE.UTOPIA,
  PREVIEW_PAGE_TYPE.COLLECT,
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
  [PREVIEW_PAGE_TYPE.CONSIGNMENTS]: (data: any) => {
    return <ConsignmentsContainer data={data} />
  },
  [PREVIEW_PAGE_TYPE.UTOPIA]: (data: any) => {
    return <UtopiaEditionsContainer data={data} />
  },
  [PREVIEW_PAGE_TYPE.COLLECT]: (data: any) => {
    return <CollectContainer data={data} />
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
