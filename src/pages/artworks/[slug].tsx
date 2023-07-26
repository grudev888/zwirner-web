import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ARTWORK_URL} from '@/common/constants/commonCopies'
import {ArtworkContainer} from '@/components/containers/artworks/artwork'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {getAllArtworkSlugs, getArtworkData} from '@/sanity/services/artwork.service'
import {allArtworkSlugs} from '@/sanity/queries/artwork.queries'

interface QuerySlug {
  slug: string
}

interface ArtworkCMSData {
  artworkData: any
  queryParams: QuerySlug
}

interface PageProps {
  data: ArtworkCMSData
  preview: boolean
  slug: string | null
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function Artwork({data, preview}: PageProps) {
  const {artworkData = {}, queryParams} = data ?? {}
  const {seo} = artworkData ?? {}
  if (preview) {
    return (
      <>
        <SEOComponent data={seo} />
        <PreviewPage
          query={allArtworkSlugs}
          params={queryParams}
          seo={seo}
          type={PREVIEW_PAGE_TYPE.ARTWORK_DETAIL}
        />
      </>
    )
  }
  return (
    <>
      <SEOComponent data={seo} />
      <ArtworkContainer data={artworkData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtworkSlugs()
  const filteredPaths = paths.filter((item: any) => item.includes('/artworks/'))
  console.log('filtered', filteredPaths)
  return {
    paths: filteredPaths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx
  const queryParams = {
    slug: `${ARTWORK_URL}/${params?.slug}`,
  }
  console.log('query params', queryParams)
  if (preview && previewData.token) {
    return {
      props: {
        data: {queryParams, artworkData: null},
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const data: any = await getArtworkData(queryParams)
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: {queryParams, artworkData: data},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
