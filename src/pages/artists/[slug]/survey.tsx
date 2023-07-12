import {GetStaticProps} from 'next'

import ArtistSurveyPageContainer from '@/components/containers/pages/artists/survey/index'
import {SEOComponent} from '@/common/components/seo/seo'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {artworksDataByArtistSlug} from '@/sanity/queries/artworkByArtist.queries'
import {getAllArtistSubPageSlugs} from '@/sanity/services/artist.service'
import {getArtworkByArtist} from '@/sanity/services/artwork.service'

interface SurveyCMS {
  surveyPage: any
}

interface PageProps {
  data: SurveyCMS
  preview: boolean
}

interface Query {
  [key: string]: string
}

export default function SurveyPage({data, preview}: PageProps) {
  const subPageData = data?.surveyPage[0]?.surveySubpage ?? {}
  const parentPath = data?.surveyPage[0]?.slug?.current
  const {seo} = subPageData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={artworksDataByArtistSlug}
        params={{slug: parentPath}}
        seo={seo}
        type={PREVIEW_PAGE_TYPE.ARTIST_DETAIL_SURVEY}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistSurveyPageContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistSubPageSlugs('survey')
  return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {params = {}} = ctx

  try {
    const data = await getArtworkByArtist({
      slug: `/artists/${params.slug}`,
    })

    return {
      props: {
        data: {
          surveyPage: data,
        },
        preview: false,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING ARTIST SURVEY DATA:', e.message)
    return {
      props: {
        data: {
          surveyPage: [],
        },
        preview: false,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
