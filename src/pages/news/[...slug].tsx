import {type GetStaticPropsContext} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {NEWS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {NEWS_SECTION, NEWS_SLUG} from '@/common/constants/gtmPageConstants'
import {ArticleContainer} from '@/components/containers/articles/article'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {articleBySlug} from '@/sanity/queries/article.queries'
import {getArticlePageBySlug} from '@/sanity/services/article.service'
import {getAllArticlePagesSlugs} from '@/sanity/services/articles/getAllArticlePagesSlugs'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

import {SharedPageProps} from '../_app'

export default function Article({data, draftMode, token}: SharedPageProps) {
  const {articleData = {}, queryParams} = data ?? {}
  const {seo} = articleData ?? {}
  if (draftMode) {
    return (
      <>
        <PreviewPage
          data={articleData}
          seo={seo}
          query={articleBySlug}
          params={queryParams}
          Container={ArticleContainer}
          token={token}
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

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params = {}, draftMode = false} = ctx

  const querySlug = (params?.slug as string[]).join('/')

  const queryParams = {slug: `${NEWS_URL}/${querySlug}`}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data: any = await getArticlePageBySlug(client, queryParams)
  if (!data) return {notFound: true}

  if (!params.slug) params.slug = NEWS_SLUG
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = NEWS_SECTION

  return {
    props: {
      data: {queryParams, articleData: data},
      dataLayerProps,
      draftMode,
      slug: params?.slug || null,
      token: draftViewToken,
    },
  }
}
