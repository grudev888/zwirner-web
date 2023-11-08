import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ARTISTS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION} from '@/common/constants/gtmPageConstants'
import {PressContainer} from '@/components/containers/artists/artistsPress'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {artistPressPageBySlug} from '@/sanity/queries/artistsPress.queries'
import {getAllPressPages, getPressDataBySlug} from '@/sanity/services/artistsPress.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

export default function PressPage({data, draftMode, queryParams, token}: SharedPageProps) {
  const [PressPageData] = data ?? []
  const {seo} = PressPageData ?? {}

  if (draftMode) {
    return (
      <PreviewPage
        data={PressPageData}
        query={artistPressPageBySlug}
        seo={seo}
        params={queryParams}
        Container={PressContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <PressContainer data={PressPageData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllPressPages()
  return {
    paths: paths?.map((item: any) => ({
      params: {slug: removePrefixSlug(item.params.slug, '/artists/')},
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {params = {}, draftMode = false} = ctx

  const queryParams = {slug: `${ARTISTS_URL}/${params?.slug}` ?? ``}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getPressDataBySlug(client, queryParams)
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.artist = data[0]?.artist?.fullName || ''
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
