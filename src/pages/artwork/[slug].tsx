import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ArtistArtworkDetailContainer} from '@/components/containers/artists/ArtistArtworkDetailContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {artistArtworkBySlug} from '@/sanity/queries/artist.queries'
import {getArtistArtworkBySlug} from '@/sanity/services/artist.service'

interface PageProps {
  data: any
  preview: boolean
  querySlug: any
}

interface Query {
  [key: string]: string
}

const ArtworkDetailPage = ({data, preview, querySlug}: PageProps) => {
  const {seo} = data ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={artistArtworkBySlug}
        params={querySlug}
        seo={seo}
        Container={ArtistArtworkDetailContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistArtworkDetailContainer data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {params = {}, preview = false} = ctx
  const querySlug = {
    slug: `/artwork/${params.slug}`,
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

  const data = await getArtistArtworkBySlug(querySlug)

  return {
    props: {
      data,
      preview: false,
      querySlug: false,
    },
  }
}

// TODO
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default ArtworkDetailPage
