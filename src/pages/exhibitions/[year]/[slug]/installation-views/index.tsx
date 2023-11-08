import {GetStaticProps} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {EXHIBITIONS_SECTION} from '@/common/constants/gtmPageConstants'
import {InstallationViewsContainer} from '@/components/containers/exhibitions/exhibitionViewsContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {installationViewsBySlug} from '@/sanity/queries/exhibitions/installationViewsBySlug'
import {getAllExhibitionPagesSlugs} from '@/sanity/services/exhibitions/getAllExhibitionPagesSlugs'
import {getExhibitionInstallationViews} from '@/sanity/services/exhibitions/getExhibitionInstallationViews'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

// TODO: update component typings to infer correct types
export default function SubPageInstallationView({data = {}, draftMode, token}: SharedPageProps) {
  const {pageData = {}, queryParams} = data ?? {}
  const {seo} = pageData ?? {}
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (draftMode) {
    return (
      <PreviewPage
        data={pageData}
        query={installationViewsBySlug}
        params={queryParams}
        seo={seo}
        Container={InstallationViewsContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <InstallationViewsContainer data={pageData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllExhibitionPagesSlugs()
  return {
    paths: paths
      // Filter just paths with year on it
      .filter((item: any) => {
        const pathParts = item?.params?.slug.split('/')
        const year = pathParts?.[pathParts?.length - 2]
        return !!year
      })
      .map((item: any) => {
        const pathParts = item?.params?.slug.split('/')
        const year = pathParts?.[pathParts?.length - 2]
        const slug = pathParts.pop()
        return {
          params: {slug, year},
        }
      }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {params = {}, draftMode = false} = ctx
  const queryParams = {slug: `${EXHIBITIONS_URL}/${params?.year}/${params?.slug}`}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getExhibitionInstallationViews(client, queryParams)
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = EXHIBITIONS_SECTION
  if (!data) return {notFound: true}

  return {
    props: {
      data: {queryParams, pageData: data},
      dataLayerProps,
      draftMode,
      slug: params?.slug || null,
      token: null,
    },
    revalidate: 1,
  }
}
