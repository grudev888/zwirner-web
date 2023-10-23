import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {PastExhibitionsContainer} from '@/components/containers/exhibitions/pastExhibitionsContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {getPastExhibitionsQueryByYear} from '@/sanity/queries/exhibitions/pastExhibitionsData'
import {
  formatPastExhibitionYears,
  getAllPastExhibitionYears,
  getPastExhibitionsByYear,
  getPastExhibitionsPageData,
  parseParamsForPastExhibitions,
  PastExhibitionsByYearProps,
} from '@/sanity/services/exhibitions/getPastExhibitionsData'

const PastExhibitionsPageByYear = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
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
  const years = await getAllPastExhibitionYears()
  if (!years || !years.length)
    return {
      paths: [],
      fallback: 'blocking',
    }

  const yearsList = formatPastExhibitionYears(years)
  const yearsSlugs = yearsList.flatMap((year) =>
    Array.from({length: 4}).map((_, i) => ({params: {year: `${year}`, page: `${i + 2}`}}))
  )

  return {
    paths: yearsSlugs,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params = {}, preview = false, previewData = {}} = ctx
  const page = Number(params?.page ?? 1)
  const year = Number(params.year)

  const queryParams = {year, initialPage: page} as PastExhibitionsByYearProps

  if (page === 1) {
    return {
      redirect: {
        destination: `${EXHIBITIONS_URL}/past-exhibitions/year/${year}`,
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

export default PastExhibitionsPageByYear
