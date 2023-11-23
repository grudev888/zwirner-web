import {type GetStaticPropsContext} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {EXHIBITIONS_SECTION, EXHIBITIONS_SLUG} from '@/common/constants/gtmPageConstants'
import {ExhibitionLandingContainer} from '@/components/containers/exhibitions/exhibitionsLandingContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {exhibitionsLandingData} from '@/sanity/queries/exhibitionPage.queries'
import {getExhibitionsLandingPageData} from '@/sanity/services/exhibition.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

import {SharedPageProps} from '../_app'

export default function ExhibitionsLanding({
  data = {},
  draftMode,
  queryParams,
  token,
}: SharedPageProps) {
  const {pageData = {}} = data ?? {}
  const {seo} = pageData ?? {}

  if (draftMode) {
    return (
      <PreviewPage
        data={pageData}
        query={exhibitionsLandingData}
        seo={seo}
        Container={ExhibitionLandingContainer}
        params={queryParams}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ExhibitionLandingContainer data={pageData} />
    </>
  )
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params = {}, draftMode = false} = ctx

  const queryParams = {slug: EXHIBITIONS_SLUG}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const pageData = await getExhibitionsLandingPageData(client)
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = EXHIBITIONS_SECTION

  return {
    props: {
      data: {
        pageData,
      },
      dataLayerProps,
      slug: params?.slug || null,
      token: draftViewToken,
      queryParams,
      draftMode,
    },
  }
}
