import {GetStaticProps, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {
  AVAILABLE_ARTWORKS_SECTION,
  AVAILABLE_ARTWORKS_SLUG,
} from '@/common/constants/gtmPageConstants'
import AWContainer from '@/components/containers/availableArtworks/awContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {availableArtworksData} from '@/sanity/queries/availableArtworks.queries'
import {getAvailableArtworksData} from '@/sanity/services/availableArtworks.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

const AvailableArtworks = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, draftMode, token} = props
  const {artworksPage = []} = data
  const [pageData] = artworksPage ?? []
  const {seo} = pageData ?? {}

  if (draftMode) {
    return (
      <PreviewPage
        data={pageData}
        query={availableArtworksData}
        seo={seo}
        Container={AWContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <AWContainer data={pageData} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {draftMode = false} = ctx
  const queryParams = {slug: AVAILABLE_ARTWORKS_SLUG}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const artworksPage = await getAvailableArtworksData(client)

  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = AVAILABLE_ARTWORKS_SECTION

  return {
    props: {
      data: {
        artworksPage,
      },
      dataLayerProps,
      slug: AVAILABLE_ARTWORKS_SLUG || null,
      token: draftViewToken,
      queryParams,
      draftMode,
    },
    revalidate: 1,
  }
}

export default AvailableArtworks
