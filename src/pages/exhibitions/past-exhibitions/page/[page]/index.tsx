import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {PastExhibitionsContainer} from '@/components/containers/exhibitions/pastExhibitionsContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {
  ALL_YEARS,
  getPastExhibitionsQueryByYear,
} from '@/sanity/queries/exhibitions/pastExhibitionsData'
import {
  formatPastExhibitionYears,
  getAllPastExhibitionYears,
  getPastExhibitionsByYear,
  getPastExhibitionsPageData,
  parseParamsForPastExhibitions,
  PastExhibitionsByYearProps,
} from '@/sanity/services/exhibitions/getPastExhibitionsData'
const PastExhibitionsPageByNumber = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, preview, queryParams} = props

  if (preview && queryParams) {
    const params = parseParamsForPastExhibitions(queryParams)
    return (
      <PreviewPage
        query={getPastExhibitionsQueryByYear(params.year)}
        params={params}
        Container={PastExhibitionsContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={data.seo} />
      <PastExhibitionsContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: Array.from({length: 5}).map(
      (_, i) => `${EXHIBITIONS_URL}/past-exhibitions/page/${i + 2}`
    ),
    fallback: 'blocking',
  }
}

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params = {}, preview = false, previewData = {}} = ctx
  const page = Number(params?.page ?? 1)

  const queryParams = {year: ALL_YEARS, initialPage: page} as PastExhibitionsByYearProps

  if (page === 1) {
    return {
      redirect: {
        destination: `${EXHIBITIONS_URL}/past-exhibitions`,
        permanent: false,
      },
    }
  }

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        queryParams,
        preview,
        token: previewData.token,
      },
    }
  }

  const data = await getPastExhibitionsPageData()
  const pastExhibitions = await getPastExhibitionsByYear(queryParams)
  const years = await getAllPastExhibitionYears()

  if (!data || !pastExhibitions || !years) return {notFound: true}

  const yearsWithExhibitions = formatPastExhibitionYears(years)

  return {
    props: {
      data: {
        ...data,
        ...pastExhibitions,
        currentPage: page,
        yearsWithExhibitions,
      },
      preview: false,
      token: null,
    },
  }
}

export default PastExhibitionsPageByNumber
