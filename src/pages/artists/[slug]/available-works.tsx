import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import ArtistAvailableWorksPageContainer from '@/components/containers/pages/artists/available-works/index'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {availableArtworksDataByArtistSlug} from '@/sanity/queries/availableArtworks.queries'
import {getAllArtistPageSlugs} from '@/sanity/services/artist.service'
import {getAvailableArtworksDataByArtistSlug} from '@/sanity/services/availableArtworks.service'
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
  const {seo} = data ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={availableArtworksDataByArtistSlug}
        params={querySlug}
        seo={seo}
        type={PREVIEW_PAGE_TYPE.ARTIST_DETAIL_AVAILABLE_WORKS}
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

  return {
    props: {
      data,
      preview: false,
      querySlug: null,
    },
  }
}
