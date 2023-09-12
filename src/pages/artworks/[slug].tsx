import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {ArtworkContainer} from '@/components/containers/artworks/artwork'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {artworkData} from '@/sanity/queries/artworks/artworkData'
import {getAllArtworkSlugs} from '@/sanity/services/artworks/getAllArtworkSlugs'
import {getArtworkData} from '@/sanity/services/artworks/getArtworkData'

const SLUG_PREFIX = '/artworks/'

const ArtworkPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, preview, querySlug} = props
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (preview) {
    return (
      <PreviewPage
        query={artworkData}
        params={querySlug}
        seo={undefined}
        Container={ArtworkContainer}
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

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params, preview = false} = ctx

  if (!params?.slug) return {notFound: true}

  const querySlug = {slug: `${SLUG_PREFIX}${params.slug}`}

  if (preview) {
    return {
      props: {
        data: null,
        preview,
        querySlug,
      },
    }
  }

  const data = await getArtworkData(querySlug)
  if (!data) return {notFound: true}

  return {
    props: {
      data,
      preview: false,
      querySlug: false,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = await getAllArtworkSlugs()
  const filteredPaths = paths.filter((item: any) => item.includes(SLUG_PREFIX))
  return {
    paths: filteredPaths,
    fallback: true,
  }
}

export default ArtworkPage
