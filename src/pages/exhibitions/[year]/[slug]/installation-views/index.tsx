import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {InstallationViewsContainer} from '@/components/containers/exhibitions/exhibitionViewsContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {installationViewsBySlug} from '@/sanity/queries/exhibitionPage.queries'
import {
  getAllExhibitionPagesSlugs,
  getExhibitionInstallationViews,
} from '@/sanity/services/exhibition.service'

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

export default function SubPageInstallationView({data = {}, preview}: PageProps) {
  const {pageData = {}, queryParams} = data ?? {}
  const {seo} = pageData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={installationViewsBySlug}
        params={queryParams}
        seo={seo}
        Container={InstallationViewsContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <InstallationViewsContainer data={pageData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllExhibitionPagesSlugs()
  return {
    paths: paths
      // Filter just paths with year on it
      .filter((item: any) => {
        const pathParts = item?.params?.slug.split('/')
        const year = pathParts?.[pathParts?.length - 2]
        return !!year
      })
      .map((item: any) => {
        const pathParts = item?.params?.slug.split('/')
        const year = pathParts?.[pathParts?.length - 2]
        const slug = pathParts.pop()
        return {
          params: {slug, year},
        }
      }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx
  const queryParams = {slug: `${EXHIBITIONS_URL}/${params?.year}/${params?.slug}`}

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

  const data: any = await getExhibitionInstallationViews(queryParams)

  return {
    props: {
      data: {queryParams, pageData: data},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
