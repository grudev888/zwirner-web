import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_SECTION, EXHIBITIONS_SLUG} from '@/common/constants/gtmPageConstants'
import {ExhibitionLandingContainer} from '@/components/containers/exhibitions/exhibitionsLandingContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {exhibitionsLandingData} from '@/sanity/queries/exhibitionPage.queries'
import {getExhibitionsLandingPageData} from '@/sanity/services/exhibition.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

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

export default function ExhibitionsLanding({data = {}, preview}: PageProps) {
  const {pageData = {}} = data ?? {}
  const {seo} = pageData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={exhibitionsLandingData}
        seo={seo}
        Container={ExhibitionLandingContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ExhibitionLandingContainer data={pageData} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const pageData = await getExhibitionsLandingPageData()

  if (!params.slug) params.slug = EXHIBITIONS_SLUG
  const dataLayerProps = await getGTMPageLoadData({slug: params.slug})
  if (dataLayerProps) dataLayerProps.page_data.site_section = EXHIBITIONS_SECTION

  return {
    props: {
      data: {
        pageData,
      },
      dataLayerProps,
      preview,
      slug: params?.slug || null,
      token: null,
    },
    revalidate: 1,
  }
}
