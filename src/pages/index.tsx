import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'
import {ErrorBoundary} from 'react-error-boundary'

import {SEOComponent} from '@/common/components/seo/seo'
import {PageBuilder} from '@/components/pageBuilder'
import {PreviewPageBuilder} from '@/components/pageBuilder/previewPageBuilder'
import {homePage} from '@/sanity/queries/page.queries'
import {getHomePage} from '@/sanity/services/page.service'
interface HomeDataCMS {
  home: any
}

interface PageProps {
  data: HomeDataCMS
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

export default function Page({data, preview}: PageProps) {
  const {home = []} = data
  const [homeData] = home ?? []
  const {components, seo} = homeData ?? {}

  if (preview) {
    return (
      <>
        <ErrorBoundary
          fallback={
            <DzColumn className="mb-12 h-full" span={12}>
              <div className="flex justify-center p-5">Something went wrong</div>
            </DzColumn>
          }
        >
          <SEOComponent data={seo} />
          <PreviewSuspense fallback="Loading...">
            <PreviewPageBuilder query={homePage} />
          </PreviewSuspense>
        </ErrorBoundary>
      </>
    )
  }

  return (
    <>
      <ErrorBoundary
        fallback={
          <DzColumn className="mb-12 h-full" span={12}>
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

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'home'}

  if (preview && previewData.token) {
    return {
      props: {
        data: {
          home: null,
        },
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  try {
    const homePage = await getHomePage()
    return {
      props: {
        data: {
          home: homePage,
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING HOME DATA:', e?.response?.statusMessage)
    return {
      props: {
        data: {
          home: [],
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
