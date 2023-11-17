import {GetStaticProps, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {PAST_EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {EXHIBITIONS_SECTION} from '@/common/constants/gtmPageConstants'
import {PastExhibitionsContainer} from '@/components/containers/exhibitions/pastExhibitionsContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
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
} from '@/sanity/services/exhibitions/getPastExhibitionsData'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

const PastExhibitionsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, draftMode, token} = props

  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        seo={data.seo}
        query={getPastExhibitionsQueryByYear(ALL_YEARS)}
        params={parseParamsForPastExhibitions({
          year: ALL_YEARS,
          initialPage: 0,
        })}
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {draftMode = false} = ctx
  const currentPage = 1

  const queryParams = {slug: PAST_EXHIBITIONS_URL}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getPastExhibitionsPageData(client)
  const pastExhibitions = await getPastExhibitionsByYear(client, {year: ALL_YEARS})
  const years = await getAllPastExhibitionYears()

  if (!data || !pastExhibitions || !years) return {notFound: true}

  const yearsWithExhibitions = formatPastExhibitionYears(years)
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = EXHIBITIONS_SECTION

  return {
    props: {
      data: {
        ...data,
        ...pastExhibitions,
        currentPage,
        yearsWithExhibitions,
      },
      token: draftViewToken,
      draftMode,
    },
  }
}

export default PastExhibitionsPage
