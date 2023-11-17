import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {FAIRS_SECTION} from '@/common/constants/gtmPageConstants'
import {ArtworkContainer} from '@/components/containers/artworks/artwork'
import {FairDetailesContainer} from '@/components/containers/fairs/fairDetailsContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {fairPageBySlug} from '@/sanity/queries/fairs/fairPageBySlug'
import {getFairPageBySlug} from '@/sanity/services/fairs/getFairPageBySlug'
import {getAllFairPageSlugs} from '@/sanity/services/fairs/getFairPageSlugs'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

const SLUG_PREFIX = '/fairs/'

const FairDetailPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, draftMode, querySlug, token} = props
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        seo={data.seo}
        query={fairPageBySlug}
        params={querySlug}
        Container={ArtworkContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={data.seo} />
      <FairDetailesContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllFairPageSlugs()
  const filteredPaths = paths
    // Filter just paths with year on it
    .filter((item: any) => {
      const pathParts = item?.params?.slug.split('/')
      const year = pathParts?.[pathParts?.length - 2]
      return !!year
    })
    .map((item: any) => {
      const pathParts = item?.params?.slug.split('/')
      const year = pathParts?.[pathParts?.length - 2]
      const slug = pathParts.pop()
      return {
        params: {slug, year},
      }
    })
  return {
    paths: filteredPaths,
    fallback: true,
  }
}

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params, draftMode = false} = ctx

  if (!params?.slug || !params.year) return {notFound: true}

  const querySlug = {slug: `${SLUG_PREFIX}${params.year}/${params.slug}`}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getFairPageBySlug(client, querySlug)
  if (!data) return {notFound: true}

  const dataLayerProps = await getGTMPageLoadData(querySlug)
  if (dataLayerProps) dataLayerProps.page_data.site_section = FAIRS_SECTION

  return {
    props: {
      data,
      dataLayerProps,
      draftMode,
      querySlug: false,
      token: draftViewToken,
    },
  }
}

export default FairDetailPage
