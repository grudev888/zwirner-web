import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'

import {PageBuilder} from '@/components/pageBuilder'
import {PreviewPageBuilder} from '@/components/pageBuilder/previewPageBuilder'
import {homePage} from '@/sanity/queries/page.queries'
import {getHomePage} from '@/sanity/services/page.service'

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

export default function Page({data, preview}: PageProps) {
  const {home = []} = data
  const [homeData] = home ?? []
  const {components} = homeData ?? {}

  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <PreviewPageBuilder query={homePage} />
      </PreviewSuspense>
    )
  }

  return <PageBuilder components={components} />
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'home'}

  if (preview && previewData.token) {
    return {
      props: {
        data: {
          exhibitions: null,
          homePage: null,
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
