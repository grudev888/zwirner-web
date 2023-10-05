import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {PastExhibitionsContainer} from '@/components/containers/exhibitions/pastExhibitionsContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {getPastExhibitionsQueryByYear} from '@/sanity/queries/exhibitions/pastExhibitionsData'
import {
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
  const yearsSlugs = years
    ?.filter((item) => item.endDate)
    ?.map(({endDate}) => ({
      params: {
        year: endDate ? new Date(endDate).getFullYear().toString() : '',
      },
    }))
  return {
    paths: yearsSlugs,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params = {}, preview = false, previewData = {}} = ctx
  const page = 1
  const year = Number(params.year)

  const queryParams = {year, initialPage: page} as PastExhibitionsByYearProps

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
  if (!data || !pastExhibitions) return {notFound: true}

  return {
    props: {
      data: {
        ...data,
        ...pastExhibitions,
        currentPage: page,
      },
      preview: false,
      token: null,
    },
  }
}

export default PastExhibitionsPageByYear
