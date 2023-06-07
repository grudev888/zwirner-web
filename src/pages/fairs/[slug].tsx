import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'
import {ErrorBoundary} from 'react-error-boundary'

import {SEOComponent} from '@/common/components/seo/seo'
import {PageBuilder} from '@/components/pageBuilder'
import {PreviewPageBuilder} from '@/components/pageBuilder/previewPageBuilder'
import {fairPageBySlug} from '@/sanity/queries/fairPage.queries'
import {getAllFairPagesSlugs, getFairPageBySlug} from '@/sanity/services/fairs.service'

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

export default function FairsPage({data = {}, preview}: PageProps) {
  const {pageData = {}} = data ?? {}
  const {components, seo} = pageData ?? {}

  if (preview) {
    const {queryParams} = data
    return (
      <>
        <SEOComponent data={seo} />
        <PreviewSuspense fallback="Loading...">
          <ErrorBoundary
            fallback={
              <DzColumn className="mb-12 h-screen" span={12}>
                <div className="flex justify-center p-5">Something went wrong</div>
              </DzColumn>
            }
          >
            <PreviewPageBuilder query={fairPageBySlug} params={queryParams} />
          </ErrorBoundary>
        </PreviewSuspense>
      </>
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
        <SEOComponent data={seo} />
        <PageBuilder components={components} />
      </ErrorBoundary>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllFairPagesSlugs()
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
    const data: any = await getFairPageBySlug(queryParams)
    return {
      props: {
        data: {queryParams, pageData: data},
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error(`ERROR FETCHING FAIRS DATA - Slug: ${params?.slug}: `, e?.response?.statusMessage)
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
