import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {getArtistArtworkBySlug} from '@/sanity/services/artist.service'
import {ArtistArtworkDetailContainer} from '@/components/containers/artists/ArtistArtworkDetailContainer'

interface PageProps {
  data: any
  preview: boolean
  querySlug: any
}

interface Query {
  [key: string]: string
}

const ArtistArtworkDetailPage = ({data, preview /*, querySlug*/}: PageProps) => {
  console.info('data: ', data)

  // TODO
  const seo = {}
  // TODO
  if (preview) {
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistArtworkDetailContainer data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {/*params = {},*/ preview = false} = ctx
  const querySlug = {
    slug: `/artworks/pumpkin-2015-2b271`,
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

  const data = await getArtistArtworkBySlug({slug: '/artworks/pumpkin-2015-2b271'})

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

export default ArtistArtworkDetailPage
