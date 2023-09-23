import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {HomeContainer} from '@/components/containers/home'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {homeData as homeDataQuery} from '@/sanity/queries/home.queries'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {getHomeData} from '@/sanity/services/home.service'

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
  console.error('This is a deliberate error for testing purposes')

  if (preview) {
    return <PreviewPage query={homeDataQuery} seo={seo} Container={HomeContainer} />
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
        dataLayerProps: null,
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  try {
    const homePage = await getHomeData()
    const dataLayerProps = await getGTMPageLoadData(params)
    return {
      props: {
        data: {
          home: homePage,
        },
        dataLayerProps: {
          ...dataLayerProps,
          page_data: {
            ...dataLayerProps?.page_data,
            site_section: 'home',
          },
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING HOME DATA:', e, JSON.stringify(e?.response))
    return {
      props: {
        data: {
          home: [],
        },
        dataLayerProps: null,
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
