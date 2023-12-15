import {DzColumn, DzSpinner} from '@zwirner/design-system'
import {type GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {PAST_EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {EXHIBITIONS_SECTION} from '@/common/constants/gtmPageConstants'
import {getCurrentYear} from '@/common/utilsMappers/date.mapper'
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

  const router = useRouter()
  if (router.isFallback) {
    return (
      <DzColumn span={12}>
        <DzSpinner />
      </DzColumn>
    )
  }

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
  const yearsSlugs = years
    ?.filter((item) => item.endDate)
    ?.map(({endDate}) => ({
      params: {
        year: endDate ? getCurrentYear(endDate).toString() : '',
      },
    }))
  return {
    paths: yearsSlugs,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params = {}, draftMode = false} = ctx
  const page = 1
  const year = Number(params.year)
  const years = await getAllPastExhibitionYears()

  if (!years) return {notFound: true}

  const yearsWithExhibitions = formatPastExhibitionYears(years)

  const queryParams = {year, initialPage: page} as PastExhibitionsByYearProps

  const gtmQueryParams = {slug: PAST_EXHIBITIONS_URL}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getPastExhibitionsPageData(client)
  const pastExhibitions = await getPastExhibitionsByYear(client, queryParams)
  const dataLayerProps = await getGTMPageLoadData(gtmQueryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = EXHIBITIONS_SECTION
  if (!data || !pastExhibitions) return {notFound: true}

  return {
    props: {
      data: {
        ...data,
        ...pastExhibitions,
        currentPage: page,
        yearsWithExhibitions,
      },
      dataLayerProps,
      queryParams,
      draftMode,
      token: draftViewToken,
    },
    revalidate: 3600,
  }
}

export default PastExhibitionsPageByYear
