import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {HomeContainer} from '@/components/containers/home'
import {PREVIEW_PAGE_TYPE} from '@/components/containers/previews/pagePreview'
import {homeData as homeDataQuery} from '@/sanity/queries/home.queries'
import {getHomeData} from '@/sanity/services/home.service'
import {PreviewPage} from '@/components/containers/previews/pagePreview'

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

export default function Home({data, preview}: PageProps) {
  const [homeData] = data?.home ?? []
  const {seo} = homeData ?? {}

  if (preview) {
    return <PreviewPage query={homeDataQuery} seo={seo} type={PREVIEW_PAGE_TYPE.HOME} />
  }

  return (
    <>
      <SEOComponent data={seo} />
      <HomeContainer data={homeData} />
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
    const homePage = await getHomeData()
    return {
      props: {
        data: {home: homePage},
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING HOME DATA:', JSON.stringify(e?.response))
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
