import {DzColumn, DzSpinner} from '@zwirner/design-system'
import {type GetStaticPropsContext} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {ARTISTS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION} from '@/common/constants/gtmPageConstants'
import {PressContainer} from '@/components/containers/artists/artistsPress'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {artistPressPageBySlug} from '@/sanity/queries/artistsPress.queries'
import {getAllPressPageSlugs} from '@/sanity/services/artists/getAllPressPageSlugs'
import {getPressDataBySlug} from '@/sanity/services/artistsPress.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

export default function PressPage({data, draftMode, queryParams, token}: SharedPageProps) {
  const [PressPageData] = data ?? []
  const {seo} = PressPageData ?? {}

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
      <PressContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllPressPageSlugs()
  return {
    paths: paths?.map((item: any) => ({
      params: {slug: removePrefixSlug(item.params.slug, '/artists/')},
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

  const data = await getPressDataBySlug(client, queryParams)
  // Press subpage only supports grid as a unique page builder element, we need to check the length of the array then
  if (!draftMode && !data?.[0]?.pressSubpage?.props?.grid?.length) return {notFound: true}

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
