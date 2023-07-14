import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {ErrorBoundary} from 'react-error-boundary'

import {SEOComponent} from '@/common/components/seo/seo'
import {ArtistDetailContainer} from '@/components/containers/artists/ArtistDetailContainer'
import PreviewPage, {PREVIEW_PAGE_TYPE} from '@/components/containers/previews/pagePreview'
import {artistPageBySlug} from '@/sanity/queries/artistPage.queries'
import {getAllArtistPageSlugs, getArtistPageBySlug} from '@/sanity/services/artist.service'
import {removePrefixSlug} from '@/utils/slug'

interface PageProps {
  data: any
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
  const {pageData} = data ?? {}
  const {seo} = pageData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={artistPageBySlug}
        params={queryParams}
        seo={seo}
        type={PREVIEW_PAGE_TYPE.ARTIST_DETAIL}
      />
    )
  }

  if (!pageData) return

  return (
    <>
      <ErrorBoundary
        fallback={
          <DzColumn className="mb-12 h-screen" span={12}>
            <div className="flex justify-center p-5">Something went wrong</div>
          </DzColumn>
        }
      >
        <SEOComponent data={seo} />
        {pageData.artist ? <ArtistDetailContainer data={pageData} /> : null}
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
        data: {},
        preview,
        slug: params?.slug || null,
        token: previewData.token,
        queryParams,
      },
    }
  }

  try {
    const data: any = await getArtistPageBySlug(queryParams)

    return {
      props: {
        data: {pageData: data},
        preview,
        slug: params?.slug || null,
        token: null,
        queryParams,
      },
    }
  } catch (e: any) {
    console.error(
      `ERROR FETCHING ARTISTS DATA - Slug: ${params?.slug}: `,
      e?.response?.statusMessage
    )
    return {
      props: {
        data: {},
        preview,
        slug: params?.slug || null,
        token: null,
        queryParams,
      },
    }
  }
}
