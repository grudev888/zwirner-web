import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION} from '@/common/constants/gtmPageConstants'
import ArtistAvailableWorksPageContainer from '@/components/containers/pages/artists/available-works/index'
import PreviewPage from '@/components/containers/previews/pagePreview'
import type {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {availableArtworksDataByArtistSlug} from '@/sanity/queries/availableArtworks.queries'
import {getAllAvailableWorksPageSlugs} from '@/sanity/services/artists/getAllAvailableWorksPageSlugs'
import {getAvailableArtworksDataByArtistSlug} from '@/sanity/services/availableArtworks.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

export default function AvailableWorksPage({data, draftMode, queryParams, token}: SharedPageProps) {
  const [artworksData] = data ?? []
  const {seo} = artworksData ?? {}

  if (draftMode) {
    return (
      <PreviewPage
        data={artworksData}
        query={availableArtworksDataByArtistSlug}
        seo={data.seo}
        params={queryParams}
        Container={ArtistAvailableWorksPageContainer}
        token={token}
      />
    )
  }
  return (
    <>
      <SEOComponent data={seo} />
      <ArtistAvailableWorksPageContainer data={artworksData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllAvailableWorksPageSlugs()
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

  const data = await getAvailableArtworksDataByArtistSlug(client, queryParams)
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.artist = data[0]?.artist?.fullName
  if (dataLayerProps) dataLayerProps.page_data.site_section = ARTISTS_SECTION

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
