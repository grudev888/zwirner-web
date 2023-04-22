import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'
import {ErrorBoundary} from 'react-error-boundary'

import {PageBuilder} from '@/components/pageBuilder'
import {PreviewPageBuilder} from '@/components/pageBuilder/previewPageBuilder'
import {artistPageBySlug} from '@/sanity/queries/artistPage.queries'
import {getAllArtistPageSlugs, getArtistPageBySlug} from '@/sanity/services/artist.service'

interface PageProps {
  data: any
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

export default function ArtistPage({data = {}, preview}: PageProps) {
  const {pageData} = data
  const {components} = pageData
  if (preview) {
    const {queryParams} = data
    return (
      <PreviewSuspense fallback="Loading...">
        <ErrorBoundary
          fallback={
            <DzColumn className="mb-12 h-full" span={12}>
              <div className="flex justify-center p-5">Something went wrong</div>
            </DzColumn>
          }
        >
          <PreviewPageBuilder query={artistPageBySlug} params={queryParams} />
        </ErrorBoundary>
      </PreviewSuspense>
    )
  }
  return <PageBuilder components={components} />
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistPageSlugs()
  return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx

  const queryParams = {slug: params?.slug ?? ``}

  if (preview && previewData.token) {
    return {
      props: {
        data: {queryParams},
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  try {
    const data: any = await getArtistPageBySlug(queryParams)
    return {
      props: {
        data: {queryParams, pageData: data},
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error(
      `ERROR FETCHING ARTISTS DATA - Slug: ${params?.slug}: `,
      e?.response?.statusMessage
    )
    return {
      props: {
        data: {queryParams},
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
