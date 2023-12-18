import {DzColumn, DzSpinner} from '@zwirner/design-system'
import {type GetStaticPropsContext} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {ARTISTS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION} from '@/common/constants/gtmPageConstants'
import {ArtistGuideContainer} from '@/components/containers/artists/guide'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {artistGuidePageBySlug} from '@/sanity/queries/artistsGuide.queries'
import {getAllGuidePageSlugs} from '@/sanity/services/artists/getAllGuidePageSlugs'
import {getGuideDataBySlug} from '@/sanity/services/artistsGuide.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

export default function GuidePage({data, draftMode, queryParams, token}: SharedPageProps) {
  const [guidePageData] = data ?? []
  const {seo} = guidePageData ?? {}

  const router = useRouter()
  if (router.isFallback) {
    return (
      <DzColumn span={12}>
        <DzSpinner />
      </DzColumn>
    )
  }

  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        query={artistGuidePageBySlug}
        seo={seo}
        params={queryParams}
        Container={ArtistGuideContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistGuideContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllGuidePageSlugs()
  return {
    paths: paths?.map((item) => ({
      params: {slug: removePrefixSlug(item.params.slug, `${ARTISTS_URL}/`)},
    })),
    fallback: true,
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params = {}, draftMode = false} = ctx

  const queryParams = {slug: `${ARTISTS_URL}/${params?.slug}` ?? ``}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getGuideDataBySlug(client, queryParams)
  // Guide subpage only supports grid as a unique page builder element, we need to check the length of the array then
  if (!draftMode && !data?.[0]?.guideSubpage?.props?.grid?.length) return {notFound: true}

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
