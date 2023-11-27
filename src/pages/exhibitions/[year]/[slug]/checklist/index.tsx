import {type GetStaticPropsContext} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {EXHIBITIONS_SECTION} from '@/common/constants/gtmPageConstants'
import {getExhibitionsTitle} from '@/common/utilsMappers/seo.mapper'
import {ExhibitionChecklistContainer} from '@/components/containers/exhibitions/exhibitionChecklistContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {checklistBySlug} from '@/sanity/queries/exhibitionPage.queries'
import {getExhibitionChecklist} from '@/sanity/services/exhibition.service'
import {getAllExhibitionPagesSlugs} from '@/sanity/services/exhibitions/getAllExhibitionPagesSlugs'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

export default function SubPageChecklist({data = {}, draftMode, token}: SharedPageProps) {
  const {pageData = {}, queryParams} = data ?? {}
  const seo = pageData?.title
    ? {...(pageData?.seo ?? {}), title: getExhibitionsTitle(pageData)}
    : null

  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (draftMode) {
    return (
      <PreviewPage
        data={pageData}
        query={checklistBySlug}
        params={queryParams}
        seo={seo}
        Container={ExhibitionChecklistContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ExhibitionChecklistContainer data={pageData} />
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

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const {params = {}, draftMode = false} = ctx
  const queryParams = {slug: `${EXHIBITIONS_URL}/${params?.year}/${params?.slug}` ?? ``}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getExhibitionChecklist(client, queryParams)
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = EXHIBITIONS_SECTION
  if (!data) return {notFound: true}

  return {
    props: {
      data: {queryParams, pageData: data},
      dataLayerProps,
      draftMode,
      slug: params?.slug || null,
      token: draftViewToken,
      queryParams,
    },
  }
}
