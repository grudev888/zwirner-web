import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ArtistArtworkDetailContainer} from '@/components/containers/artists/ArtistArtworkDetailContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {artistArtworkBySlug} from '@/sanity/queries/artist.queries'
import {getArtistArtworkBySlug} from '@/sanity/services/artist.service'

const ArtworkDetailPage = ({
  data,
  preview,
  querySlug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (preview) {
    return (
      <PreviewPage
        query={artistArtworkBySlug}
        params={querySlug}
        seo={undefined}
        Container={ArtistArtworkDetailContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={data?.seo} />
      <ArtistArtworkDetailContainer data={data} />
    </>
  )
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
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
