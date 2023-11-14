import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION} from '@/common/constants/gtmPageConstants'
import ArtistSurveyPageContainer from '@/components/containers/pages/artists/survey/index'
import PreviewPage from '@/components/containers/previews/pagePreview'
import type {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {artworksDataByArtistSlug} from '@/sanity/queries/artworks/artworksDataByArtistSlug'
import {getAllSurveyPagesSlugs} from '@/sanity/services/artists/getAllSurveyPageSlugs'
import {getArtworkByArtist} from '@/sanity/services/artworks/getArtworkByArtist'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

export default function SurveyPage({data, draftMode, queryParams, token}: SharedPageProps) {
  const [surveyData] = data ?? []
  const {seo} = surveyData ?? {}

  if (draftMode) {
    return (
      <PreviewPage
        data={surveyData}
        query={artworksDataByArtistSlug}
        params={queryParams}
        Container={ArtistSurveyPageContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistSurveyPageContainer data={surveyData} />
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {params = {}, draftMode = false} = ctx

  const queryParams = {slug: `/artists/${params?.slug ?? ``}`}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getArtworkByArtist(client, queryParams)

  if (!data?.[0]?.surveySubpage?.[0]?.props?.grid?.length) return {notFound: true}
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
    revalidate: 1,
  }
}
