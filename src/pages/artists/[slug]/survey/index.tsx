import {type GetStaticPropsContext, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION} from '@/common/constants/gtmPageConstants'
import ArtistSurveyPageContainer from '@/components/containers/pages/artists/survey/index'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {artworksDataByArtistSlug} from '@/sanity/queries/artworks/artworksDataByArtistSlug'
import {getAllSurveyPagesSlugs} from '@/sanity/services/artists/getAllSurveyPageSlugs'
import {getArtworkByArtist} from '@/sanity/services/artworks/getArtworkByArtist'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

export default function SurveyPage({
  data,
  draftMode,
  queryParams,
  token,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {seo} = data?.[0] ?? {}

  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        query={artworksDataByArtistSlug}
        params={queryParams}
        seo={seo}
        Container={ArtistSurveyPageContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistSurveyPageContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllSurveyPagesSlugs()
  return {
    paths: paths.map((item) => ({
      params: {slug: removePrefixSlug(item.params.slug, '/artists/')},
    })),
    fallback: true,
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params = {}, draftMode = false} = ctx

  const queryParams = {slug: `/artists/${params?.slug ?? ``}`}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getArtworkByArtist(client, queryParams)

  const isThomasRuff = params?.slug === 'thomas-ruff'
  if (isThomasRuff && !data?.[0]?.surveySeries?.length) return {notFound: true}
  if (!isThomasRuff && !data?.[0]?.surveySubpage?.length) return {notFound: true}

  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) {
    dataLayerProps.page_data.artist = data[0]?.artist?.fullName || ''
    dataLayerProps.page_data.site_section = ARTISTS_SECTION
  }

  return {
    props: {
      data,
      dataLayerProps,
      slug: params?.slug || null,
      token: draftViewToken,
      queryParams,
      draftMode,
    },
  }
}
