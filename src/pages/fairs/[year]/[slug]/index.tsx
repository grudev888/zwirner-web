import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {FAIRS_SECTION} from '@/common/constants/gtmPageConstants'
import {ArtworkContainer} from '@/components/containers/artworks/artwork'
import {FairDetailesContainer} from '@/components/containers/fairs/fairDetailsContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {fairPageBySlug} from '@/sanity/queries/fairs/fairPageBySlug'
import {getFairPageBySlug} from '@/sanity/services/fairs/getFairPageBySlug'
import {getAllFairPageSlugs} from '@/sanity/services/fairs/getFairPageSlugs'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

const SLUG_PREFIX = '/fairs/'

const FairDetailPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, preview, querySlug} = props
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (preview) {
    return <PreviewPage query={fairPageBySlug} params={querySlug} Container={ArtworkContainer} />
  }

  return (
    <>
      <SEOComponent data={data.seo} />
      <FairDetailesContainer data={data} />
    </>
  )
}

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params, preview = false, previewData} = ctx

  if (!params?.slug || !params.year) return {notFound: true}

  const querySlug = {slug: `${SLUG_PREFIX}${params.year}/${params.slug}`}

  if (preview && previewData?.token) {
    return {
      props: {
        data: null,
        preview,
        querySlug,
        token: previewData.token,
      },
    }
  }

  const data = await getFairPageBySlug(querySlug)
  if (!data) return {notFound: true}

  const dataLayerProps = await getGTMPageLoadData(querySlug)
  if (dataLayerProps) dataLayerProps.page_data.site_section = FAIRS_SECTION

  return {
    props: {
      data,
      dataLayerProps,
      preview,
      querySlug: false,
    },
    revalidate: 1,
  }
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

export default FairDetailPage
