import {GetStaticProps, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTWORKS_SECTION} from '@/common/constants/gtmPageConstants'
import {ArtworkContainer} from '@/components/containers/artworks/artwork'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {artworkData} from '@/sanity/queries/artworks/artworkData'
import {getAllArtworkSlugs} from '@/sanity/services/artworks/getAllArtworkSlugs'
import {getArtworkData} from '@/sanity/services/artworks/getArtworkData'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

const SLUG_PREFIX = '/artworks/'

const ArtworkPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, draftMode, token, slug} = props
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (draftMode && token) {
    return (
      <PreviewPage
        data={data}
        query={artworkData}
        seo={data.seo}
        params={slug}
        Container={ArtworkContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={data.seo} />
      <ArtworkContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtworkSlugs()
  const filteredPaths = paths
    .filter(({slug}) => slug.includes(SLUG_PREFIX))
    .map((item) => item.slug)
  return {
    paths: filteredPaths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {params, draftMode = false} = ctx

  if (!params?.slug) return {notFound: true}

  const querySlug = {slug: `${SLUG_PREFIX}${params.slug}`}

  const draftViewToken = draftMode ? readToken : ''
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getArtworkData(client, querySlug)
  if (!data) return {notFound: true}

  const dataLayerProps = await getGTMPageLoadData(querySlug)
  if (dataLayerProps) dataLayerProps.page_data.site_section = ARTWORKS_SECTION
  return {
    props: {
      data,
      dataLayerProps,
      slug: querySlug || null,
      draftMode,
      token: draftViewToken,
    },
    revalidate: 1,
  }
}

export default ArtworkPage
