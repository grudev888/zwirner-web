import {GetStaticProps} from 'next'
import {SEOComponent} from '@/common/components/seo/seo'
import ArtistExhibitionsPageContainer from '@/components/containers/pages/artists/exhibitions'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {getAllArtistSubPageSlugs} from '@/sanity/services/artist.service'
import {exhibitionsByArtistSlug} from '@/sanity/queries/exhibition.queries'
import {getExhibitionsByArtistSlug} from '@/sanity/services/exhibition.service'

interface PageProps {
  data: any
  preview: boolean
  querySlug: any
}

interface Query {
  [key: string]: string
}

export default function ExhibitionsPage({data, preview, querySlug}: PageProps) {
  const [exhibitionData] = data ?? []
  const {seo} = exhibitionData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={exhibitionsByArtistSlug}
        params={querySlug}
        seo={seo}
        type={PREVIEW_PAGE_TYPE.ARTIST_DETAIL_EXHIBITIONS}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistExhibitionsPageContainer data={exhibitionData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistSubPageSlugs('survey')
  return {paths, fallback: true}
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

  const data = await getExhibitionsByArtistSlug(querySlug)

  return {
    props: {
      data,
      preview: false,
      querySlug: null,
    },
  }
}
