import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {ExhibitionChecklistContainer} from '@/components/containers/exhibitions/exhibitionChecklistContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {checklistBySlug} from '@/sanity/queries/exhibitionPage.queries'
import {
  getAllExhibitionPagesSlugs,
  getExhibitionChecklist,
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

export default function SubPageChecklist({data = {}, preview}: PageProps) {
  const {pageData = {}, queryParams} = data ?? {}
  const {seo} = pageData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={checklistBySlug}
        params={queryParams}
        seo={seo}
        Container={ExhibitionChecklistContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ExhibitionChecklistContainer data={pageData} />
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

  const data = await getExhibitionChecklist(queryParams)

  return {
    props: {
      data: {queryParams, pageData: data},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
