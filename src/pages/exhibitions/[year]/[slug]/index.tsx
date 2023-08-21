import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {ExhibitionsContainer} from '@/components/containers/exhibitions/exhibitionDetailContainer/exhibitions'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {exhibitionPageBySlug} from '@/sanity/queries/exhibitionPage.queries'
import {
  getAllExhibitionPagesSlugs,
  getExhibitionPageBySlug,
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

export default function ExhibitionsPage({data = {}, preview}: PageProps) {
  const {pageData = {}, queryParams} = data ?? {}
  const {seo} = pageData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={exhibitionPageBySlug}
        params={queryParams}
        seo={seo}
        Container={ExhibitionsContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ExhibitionsContainer data={pageData} />
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
  const queryParams = {slug: `${EXHIBITIONS_URL}/${params?.year}/${params?.slug}` ?? ``}

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

  const data: any = await getExhibitionPageBySlug(queryParams)

  return {
    props: {
      data: {queryParams, pageData: data},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}