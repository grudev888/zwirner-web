import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ExhibitionLandingContainer} from '@/components/containers/exhibitions/exhibitionsLandingContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {exhibitionPageBySlug} from '@/sanity/queries/exhibitionPage.queries'
import {getExhibitionsLanding} from '@/sanity/services/exhibition.service'

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
      <PreviewPage query={exhibitionPageBySlug} seo={seo} Container={ExhibitionLandingContainer} />
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

  // TODO DEFINE ONLY NECESSARY DATA FOR THIS SUB_PAGE
  const data: any = await getExhibitionsLanding()

  return {
    props: {
      data: {pageData: data},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
