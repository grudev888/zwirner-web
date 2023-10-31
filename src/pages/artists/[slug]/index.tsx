import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {ErrorBoundary} from 'react-error-boundary'

import {SEOComponent} from '@/common/components/seo/seo'
import {ArtistDetailContainer} from '@/components/containers/artists/ArtistDetailContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {artistPageBySlug} from '@/sanity/queries/artistPage.queries'
import {getAllArtistPageSlugs, getArtistPageBySlug} from '@/sanity/services/artist.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

interface PageProps {
  data?: any
  preview: boolean
  slug: string | null
  token: string | null
  queryParams: {slug: string}
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ArtistPage({data = {}, preview, queryParams}: PageProps) {
  if (preview) {
    return (
      <PreviewPage
        query={artistPageBySlug}
        params={queryParams}
        Container={ArtistDetailContainer}
      />
    )
  }

  return (
    <>
      <ErrorBoundary
        fallback={
          <DzColumn className="mb-12 h-screen" span={12}>
            <div className="flex justify-center p-5">Something went wrong</div>
          </DzColumn>
        }
      >
        <SEOComponent data={data.seo} />
        {data.artist ? <ArtistDetailContainer data={data} /> : null}
      </ErrorBoundary>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistPageSlugs()
  return {
    paths: paths.map(({params}) => ({
      params: {slug: removePrefixSlug(params.slug, '/artists/')},
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx

  const queryParams = {slug: `/artists/${params?.slug ?? ``}`}

  if (preview && previewData.token) {
    return {
      props: {
        preview,
        slug: params?.slug || null,
        token: previewData.token,
        queryParams,
      },
    }
  }

  try {
    const data: any = await getArtistPageBySlug(queryParams)
    const dataLayerProps = await getGTMPageLoadData(queryParams)
    if (dataLayerProps) dataLayerProps.page_data.artist = data?.artist?.fullName
    if (!data) return {notFound: true}

    return {
      props: {
        data,
        preview,
        dataLayerProps,
        slug: params?.slug || null,
        token: null,
        queryParams,
      },
      revalidate: 1,
    }
  } catch (e: any) {
    console.error(
      `ERROR FETCHING ARTISTS DATA - Slug: ${params?.slug}: `,
      e?.response?.statusMessage
    )
    return {notFound: true}
  }
}
