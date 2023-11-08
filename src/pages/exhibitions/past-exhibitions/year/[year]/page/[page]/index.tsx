import {GetStaticProps, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL, PAST_EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {EXHIBITIONS_SECTION} from '@/common/constants/gtmPageConstants'
import {PastExhibitionsContainer} from '@/components/containers/exhibitions/pastExhibitionsContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {getPastExhibitionsQueryByYear} from '@/sanity/queries/exhibitions/pastExhibitionsData'
import {
  formatPastExhibitionYears,
  getAllPastExhibitionYears,
  getPastExhibitionsByYear,
  getPastExhibitionsPageData,
  parseParamsForPastExhibitions,
  PastExhibitionsByYearProps,
} from '@/sanity/services/exhibitions/getPastExhibitionsData'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

const PastExhibitionsPageByYear = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, draftMode, queryParams, token} = props

  if (draftMode && queryParams) {
    const params = parseParamsForPastExhibitions(queryParams)
    return (
      <PreviewPage
        data={data}
        seo={data.seo}
        query={getPastExhibitionsQueryByYear(params.year)}
        params={params}
        Container={PastExhibitionsContainer}
        token={token}
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {params = {}, draftMode = false} = ctx
  const page = Number(params?.page ?? 1)
  const year = Number(params.year)

  const queryParams = {year, initialPage: page} as PastExhibitionsByYearProps

  const gtmQueryParams = {slug: PAST_EXHIBITIONS_URL}

  if (page === 1) {
    return {
      redirect: {
        destination: `${EXHIBITIONS_URL}/past-exhibitions/year/${year}`,
        permanent: false,
      },
    }
  }

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getPastExhibitionsPageData(client)
  const pastExhibitions = await getPastExhibitionsByYear(client, queryParams)
  const years = await getAllPastExhibitionYears()
  const dataLayerProps = await getGTMPageLoadData(gtmQueryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = EXHIBITIONS_SECTION

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
      dataLayerProps,
      draftMode,
      queryParams,
      token: draftViewToken,
    },
    revalidate: 1,
  }
}

export default PastExhibitionsPageByYear
