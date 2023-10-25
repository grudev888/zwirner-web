import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import ArtistExhibitionsPageContainer from '@/components/containers/pages/artists/exhibitions'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {artistExhibitionsPageData} from '@/sanity/queries/artistExhibitionsPage.queries'
import {getAllArtistPageSlugs} from '@/sanity/services/artist.service'
import {getArtistExhibitionsPageData} from '@/sanity/services/artistPages.service'
import {removePrefixSlug} from '@/utils/slug'

interface PageProps {
  data: any
  preview: boolean
  queryArtistSlug?: Record<string, any>
}

interface Query {
  [key: string]: string
}

export default function ExhibitionsPage({data, preview, queryArtistSlug}: PageProps) {
  const {seo} = data ?? {}
  if (preview) {
    return (
      <PreviewPage
        query={artistExhibitionsPageData}
        params={queryArtistSlug}
        Container={ArtistExhibitionsPageContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistExhibitionsPageContainer data={data} />
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
  const artistSlug = `/artists/${params.slug}`
  const queryArtistSlug = {slug: artistSlug}

  if (preview) {
    return {
      props: {
        data: null,
        preview,
        queryArtistSlug,
      },
    }
  }

  const data = await getArtistExhibitionsPageData(artistSlug)

  return {
    props: {
      data,
      preview: false,
      queryArtistSlug,
    },
    revalidate: 1,
  }
}
