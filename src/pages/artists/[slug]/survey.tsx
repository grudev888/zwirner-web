import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import ArtistSurveyPageContainer from '@/components/containers/pages/artists/survey/index'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {artworksDataByArtistSlug} from '@/sanity/queries/artworks/artworksDataByArtistSlug'
import {getAllArtistPageSlugs} from '@/sanity/services/artist.service'
import {getArtworkByArtist} from '@/sanity/services/artworks/getArtworkByArtist'
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

export default function SurveyPage({data, preview, querySlug}: PageProps) {
  const [surveyData] = data ?? []
  const {seo} = surveyData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={artworksDataByArtistSlug}
        params={querySlug}
        Container={ArtistSurveyPageContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistSurveyPageContainer data={surveyData} />
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

  const data = await getArtworkByArtist(querySlug)
  const dataLayerProps = await getGTMPageLoadData(querySlug)
  if (dataLayerProps) dataLayerProps.page_data.artist = data[0]?.artist?.fullName || ''

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
