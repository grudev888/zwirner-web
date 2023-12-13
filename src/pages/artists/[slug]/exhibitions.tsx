import {type GetStaticPropsContext} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION} from '@/common/constants/gtmPageConstants'
import ArtistExhibitionsPageContainer from '@/components/containers/pages/artists/exhibitions'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {artistExhibitionsPageData} from '@/sanity/queries/artistExhibitionsPage.queries'
import {getArtistExhibitionsPageData} from '@/sanity/services/artistPages.service'
import {getAllExhibitionsPageSlugs} from '@/sanity/services/artists/getAllExhibitionsPageSlugs'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

export default function ExhibitionsPage({data, draftMode, queryParams, token}: SharedPageProps) {
  const {seo} = data ?? {}
  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        query={artistExhibitionsPageData}
        seo={data.seo}
        params={queryParams}
        Container={ArtistExhibitionsPageContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistExhibitionsPageContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllExhibitionsPageSlugs()
  return {
    paths: paths.map((item) => ({
      params: {slug: removePrefixSlug(item.params.slug, '/artists/')},
    })),
    fallback: true,
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params = {}, draftMode = false} = ctx
  const artistSlug = `/artists/${params.slug}`
  const queryParams = {slug: artistSlug}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getArtistExhibitionsPageData(client, artistSlug)
  // Exhibitions is the array of exhibitions for the artist, we should be checking for the length of it
  if (!draftMode && !data?.artist?.exhibitions?.length) return {notFound: true}

  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) {
    dataLayerProps.page_data.artist = data?.artist?.fullName || ''
    dataLayerProps.page_data.site_section = ARTISTS_SECTION
  }

  return {
    props: {
      data,
      preview: false,
      dataLayerProps,
      slug: params?.slug || null,
      token: draftViewToken,
      queryParams,
      draftMode,
    },
  }
}
