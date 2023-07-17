import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ARTISTS_PRESS_URL, ARTISTS_URL} from '@/common/constants/commonCopies'
import ArtistArticlePressContainer from '@/components/containers/articles/press'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {pressBySlug} from '@/sanity/queries/article.queries'
import {getAllPressPages, getPressPageBySlug} from '@/sanity/services/article.service'

interface QuerySlug {
  slug: string
}

interface ArticleCMSData {
  articleData: any
  queryParams: QuerySlug
}

interface PageProps {
  data: ArticleCMSData
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

export default function Article({data, preview}: PageProps) {
  const {articleData = {}, queryParams} = data ?? {}
  const {seo} = articleData ?? {}
  if (preview) {
    return (
      <>
        <SEOComponent data={seo} />
        <PreviewPage
          query={pressBySlug}
          params={queryParams}
          seo={seo}
          type={PREVIEW_PAGE_TYPE.ARTIST_DETAIL_PRESS}
        />
      </>
    )
  }
  return (
    <>
      <SEOComponent data={seo} />
      <ArtistArticlePressContainer data={articleData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllPressPages()
  console.log('paths', paths.length)
  const filteredPaths = paths.filter((item: any) => {
    return item
  })
  console.log('filteredPaths', filteredPaths.length)
  return {
    paths: filteredPaths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx
  const queryParams = {
    slug: `${ARTISTS_URL}/${params?.slug}${ARTISTS_PRESS_URL}/${params?.press}` ?? ``,
  }
  if (preview && previewData.token) {
    return {
      props: {
        data: {queryParams, articleData: null},
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const data: any = await getPressPageBySlug(queryParams)
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: {queryParams, articleData: data},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
