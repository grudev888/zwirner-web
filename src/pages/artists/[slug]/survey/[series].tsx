import {type GetStaticPropsContext, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ARTISTS_URL, SURVEY_URL} from '@/common/constants/commonCopies'
import ArtistSurveySeriesPageContainer from '@/components/containers/pages/artists/survey/series'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {surveySeriesPageBySlug} from '@/sanity/queries/artists/surveySeriesPageBySlug'
import {getAllSurveySeriesPageSlugs} from '@/sanity/services/artists/getAllSurveySeriesPageSlugs'
import {getSurveySeriesPageBySlug} from '@/sanity/services/artists/getSurveySeriesPageBySlug'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

export default function SeriesPage({
  data,
  draftMode,
  queryParams,
  token,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {seo} = data?.[0]?.seriesData ?? {}

  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        query={surveySeriesPageBySlug}
        params={queryParams}
        seo={seo}
        Container={ArtistSurveySeriesPageContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistSurveySeriesPageContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const artistPages = await getAllSurveySeriesPageSlugs()
  const paths = artistPages
    .map((page: any) => {
      return page.surveySeriesSlugs
    })
    .flat()
    .filter((item: any) => {
      const pathParts = item?.params?.slug.split('/')
      const slug = pathParts?.[pathParts?.length - 3]
      return !!slug
    })
    .map((item: any) => {
      const pathParts = item?.params?.slug.split('/')
      const slug = pathParts?.[pathParts?.length - 3]
      const series = pathParts.pop()
      return {
        params: {slug, series},
      }
    })
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params = {}, draftMode = false} = ctx

  const queryParams = {
    slug: `${ARTISTS_URL}/${params.slug}${SURVEY_URL}/${params.series}`,
    artistSlug: `${ARTISTS_URL}/${params.slug}`,
  }

  const draftViewToken = draftMode ? readToken : ``
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getSurveySeriesPageBySlug(client, queryParams)
  if (data?.length === 0 || !data?.[0]?.seriesData.detailContent?.length) return {notFound: true}

  const dataLayerProps = await getGTMPageLoadData(queryParams)

  return {
    props: {
      data,
      dataLayerProps,
      slug: params.slug,
      token: draftViewToken,
      queryParams,
      draftMode,
    },
  }
}
