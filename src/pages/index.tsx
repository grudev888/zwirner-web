import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {HomeContainer} from '@/components/containers/home'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {homeData as homeDataQuery} from '@/sanity/queries/home.queries'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {getHomePage} from '@/sanity/services/page/getHomePage'

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

export default function Home({data, preview}: PageProps) {
  const {seo} = data ?? {}

  if (preview) {
    return <PreviewPage query={homeDataQuery} seo={seo} Container={HomeContainer} />
  }

  return (
    <>
      <SEOComponent data={seo} />
      <HomeContainer data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'home'}

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        dataLayerProps: null,
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const homePage = await getHomePage()
  const dataLayerProps = await getGTMPageLoadData(params)

  if (!homePage) return {notFound: true}

  return {
    props: {
      data: homePage,
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
}
