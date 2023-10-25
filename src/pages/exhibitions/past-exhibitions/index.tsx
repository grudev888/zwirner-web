import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
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
} from '@/sanity/services/exhibitions/getPastExhibitionsData'

const PastExhibitionsPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, preview} = props

  if (preview) {
    return (
      <PreviewPage
        query={getPastExhibitionsQueryByYear(ALL_YEARS)}
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

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {preview = false, previewData = {}} = ctx
  const currentPage = 1

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        preview,
        token: previewData.token,
      },
    }
  }

  const data = await getPastExhibitionsPageData()
  const pastExhibitions = await getPastExhibitionsByYear({year: ALL_YEARS})
  const years = await getAllPastExhibitionYears()

  if (!data || !pastExhibitions || !years) return {notFound: true}

  const yearsWithExhibitions = formatPastExhibitionYears(years)

  return {
    props: {
      data: {
        ...data,
        ...pastExhibitions,
        currentPage,
        yearsWithExhibitions,
      },
      preview: false,
      token: null,
    },
    revalidate: 1,
  }
}

export default PastExhibitionsPage
