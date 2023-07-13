import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {NEWS_URL} from '@/common/constants/commonCopies'
import {ArticleContainer} from '@/components/containers/articles/article'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {articleBySlug} from '@/sanity/queries/article.queries'
import {getAllArticlePages, getArticlePageBySlug} from '@/sanity/services/article.service'

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
}

interface Query {
  [key: string]: any
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
          query={articleBySlug}
          params={queryParams}
          seo={seo}
          type={PREVIEW_PAGE_TYPE.SINGLE_ARTICLE}
        />
      </>
    )
  }
  return (
    <>
      <SEOComponent data={seo} />
      <ArticleContainer data={articleData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArticlePages()
  return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false} = ctx

  const queryParams = {slug: `${NEWS_URL}/${params?.slug.join('/')}` ?? ``}

  if (preview) {
    return {
      props: {
        data: {queryParams, articleData: null},
        preview,
        slug: params?.slug || null,
      },
    }
  }

  const data: any = await getArticlePageBySlug(queryParams)
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
    },
  }
}
