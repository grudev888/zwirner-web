import {type GetStaticPropsContext} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION, ARTISTS_SLUG} from '@/common/constants/gtmPageConstants'
import {ArtistsListContainer} from '@/components/containers/artists/ArtistListContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {getAllArtistsPages} from '@/sanity/queries/artistPage.queries'
import {getArtistPageData} from '@/sanity/services/artist.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

import {SharedPageProps} from '../_app'

export default function Artists({data, draftMode, token}: SharedPageProps) {
  const {pageInfo} = data
  const [pagesInfoData] = pageInfo

  const {seo} = pagesInfoData ?? {}

  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        query={getAllArtistsPages}
        seo={seo}
        Container={ArtistsListContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistsListContainer data={data} />
    </>
  )
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {draftMode = false} = ctx

  const params = {slug: ARTISTS_SLUG}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const artistPage = await getArtistPageData(client)
  const dataLayerProps = await getGTMPageLoadData(params)
  if (dataLayerProps) dataLayerProps.page_data.site_section = ARTISTS_SECTION
  return {
    props: {
      data: artistPage,
      dataLayerProps,
      draftMode,
      slug: params?.slug || null,
      token: draftViewToken,
    },
  }
}
