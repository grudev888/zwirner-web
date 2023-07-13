import {GetStaticProps} from 'next'

import ArtistExhibitionsPageContainer from '@/components/containers/pages/artists/exhibitions'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {getAllArtistSubPageSlugs} from '@/sanity/services/artist.service'
import {getExhibitionsByArtistSlug} from '@/sanity/services/exhibition.service'
import {exhibitionsByArtistSlug} from '@/sanity/queries/exhibition.queries'

interface PageProps {
  data: any
  preview: boolean
  queryArtistSlug?: Record<string, any>
}

interface Query {
  [key: string]: string
}

export default function ExhibitionsPage({data, preview, queryArtistSlug}: PageProps) {
  if (preview) {
    return (
      <PreviewPage
        query={exhibitionsByArtistSlug}
        params={queryArtistSlug}
        seo={null}
        type={PREVIEW_PAGE_TYPE.ARTIST_DETAIL_EXHIBITIONS}
      />
    )
  }

  return <ArtistExhibitionsPageContainer data={data} />
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistSubPageSlugs('exhibitions')
  return {paths, fallback: true}
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

  const data = await getExhibitionsByArtistSlug(artistSlug)

  return {
    props: {
      data,
      preview: false,
      queryArtistSlug,
    },
  }
}
