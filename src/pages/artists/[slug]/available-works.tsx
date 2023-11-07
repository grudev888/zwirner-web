import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import ArtistAvailableWorksPageContainer from '@/components/containers/pages/artists/available-works/index'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {availableArtworksDataByArtistSlug} from '@/sanity/queries/availableArtworks.queries'
import {getAllArtistPageSlugs} from '@/sanity/services/artists/getAllArtistPageSlugs'
import {getAvailableArtworksDataByArtistSlug} from '@/sanity/services/availableArtworks.service'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

interface PageProps {
  data: any
  preview: boolean
  querySlug: any
}

interface Query {
  [key: string]: string
}

export default function AvailableWorksPage({data, preview, querySlug}: PageProps) {
  const [artworksData] = data ?? []
  const {seo} = artworksData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={availableArtworksDataByArtistSlug}
        params={querySlug}
        Container={ArtistAvailableWorksPageContainer}
      />
    )
  }
  return (
    <>
      <SEOComponent data={seo} />
      <ArtistAvailableWorksPageContainer data={artworksData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistPageSlugs()
  return {
    paths: paths.map((item: any) => ({
      params: {slug: removePrefixSlug(item.params.slug, '/artists/')},
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {params = {}, preview = false} = ctx
  const querySlug = {
    slug: `/artists/${params.slug}`,
  }

  if (preview) {
    return {
      props: {
        data: null,
        preview,
        querySlug,
      },
    }
  }

  const data = await getAvailableArtworksDataByArtistSlug(querySlug)
  const dataLayerProps = await getGTMPageLoadData(querySlug)
  if (dataLayerProps) dataLayerProps.page_data.artist = data[0]?.artist?.fullName

  return {
    props: {
      data,
      preview: false,
      dataLayerProps,
      querySlug: null,
    },
    revalidate: 1,
  }
}
