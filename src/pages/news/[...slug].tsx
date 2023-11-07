import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {NEWS_URL} from '@/common/constants/commonCopies'
import {NEWS_SECTION, NEWS_SLUG} from '@/common/constants/gtmPageConstants'
import {ArticleContainer} from '@/components/containers/articles/article'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {articleBySlug} from '@/sanity/queries/article.queries'
import {getArticlePageBySlug} from '@/sanity/services/article.service'
import {getAllArticlePagesSlugs} from '@/sanity/services/articles/getAllArticlePagesSlugs'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

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
          Container={ArticleContainer}
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
  const paths = await getAllArticlePagesSlugs()
  return {
    paths: paths.map((item) => ({
      params: {slug: removePrefixSlug(item.params.slug, '/news/').split('/')},
    })),
    fallback: true,
  }
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

  if (!params.slug) params.slug = NEWS_SLUG
  const dataLayerProps = await getGTMPageLoadData({slug: params.slug.toString()})
  if (dataLayerProps) dataLayerProps.page_data.site_section = NEWS_SECTION

  return {
    props: {
      data: {queryParams, articleData: data},
      preview,
      slug: params?.slug || null,
    },
    revalidate: 1,
  }
}
