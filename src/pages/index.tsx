import {GetStaticProps, InferGetStaticPropsType} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {Home_SECTION, Home_SLUG} from '@/common/constants/gtmPageConstants'
import {HomeContainer} from '@/components/containers/home'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {homePage} from '@/sanity/queries/page/homePage'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {getHomePage} from '@/sanity/services/page/getHomePage'

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {data, draftMode, token} = props

  if (draftMode && token) {
    return (
      <PreviewPage
        data={data}
        query={homePage}
        seo={data.seo}
        Container={HomeContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={data.seo} />
      <HomeContainer data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {draftMode = false} = ctx

  const draftViewToken = draftMode ? readToken : ''
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const params = {slug: Home_SLUG}

  const homePage = await getHomePage(client)
  const dataLayerProps = await getGTMPageLoadData(params)
  if (dataLayerProps) dataLayerProps.page_data.site_section = Home_SECTION

  if (!homePage) return {notFound: true}

  return {
    props: {
      data: homePage,
      dataLayerProps,
      slug: params?.slug || null,
      draftMode,
      token: draftViewToken,
    },
  }
}

export default Home
