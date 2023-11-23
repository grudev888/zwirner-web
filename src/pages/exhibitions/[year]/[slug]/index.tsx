import {type GetStaticPropsContext} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {EXHIBITIONS_SECTION} from '@/common/constants/gtmPageConstants'
import {ExceptionalWorkContainer} from '@/components/containers/exhibitions/exceptionalWorkContainer'
import {ExhibitionsContainer} from '@/components/containers/exhibitions/exhibitionDetailContainer/exhibitions'
import {OnlineExhibitionsContainer} from '@/components/containers/exhibitions/onlineExhibitionsContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {getClient, readToken} from '@/sanity/client'
import {
  exceptionalWorksData,
  ExceptionalWorksDataType,
} from '@/sanity/queries/exhibitions/exceptionalWorksData'
import {
  exhibitionPageBySlug,
  ExhibitionPageBySlugType,
} from '@/sanity/queries/exhibitions/exhibitionPageBySlug'
import {
  onlineExhibitionsDataBySlug,
  OnlineExhibitionsType,
} from '@/sanity/queries/exhibitions/onlineExhibitionsData'
import {getAllExhibitionPagesSlugs} from '@/sanity/services/exhibitions/getAllExhibitionPagesSlugs'
import {getExceptionalWorkData} from '@/sanity/services/exhibitions/getExceptionalWorkData'
import {getExhibitionPageBySlug} from '@/sanity/services/exhibitions/getExhibitionPageBySlug'
import {getOnlineExhibitionsData} from '@/sanity/services/exhibitions/getOnlineExhibitionsData'
import {getRecordType} from '@/sanity/services/exhibitions/getRecordType'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

type ExhibitionShape = ExceptionalWorksDataType | ExhibitionPageBySlugType | OnlineExhibitionsType
type ExhibitionsPageProps = {
  data: ExhibitionShape
  draftMode: boolean
  queryParams: any
  slug: any
  token: any
}
type PageContainerSchema = {
  query: string
  params: any
  container: any
}
export default function ExhibitionsPage(props: ExhibitionsPageProps) {
  const {data, queryParams, draftMode, token} = props
  const router = useRouter()
  const {seo, _type} = data ?? {}

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  let PageContainer: PageContainerSchema | null = null

  if (_type === 'exhibitionPage') {
    PageContainer = {
      query: exhibitionPageBySlug,
      params: queryParams,
      container: ExhibitionsContainer,
    }
  }
  if (_type === 'exceptionalWork') {
    PageContainer = {
      query: exceptionalWorksData,
      params: queryParams,
      container: ExceptionalWorkContainer,
    }
  }

  if (_type === 'onlineExhibitionPage') {
    PageContainer = {
      query: onlineExhibitionsDataBySlug,
      params: queryParams,
      container: OnlineExhibitionsContainer,
    }
  }

  if (draftMode && PageContainer) {
    return (
      <PreviewPage
        data={data as ExhibitionShape}
        seo={seo}
        query={PageContainer.query}
        params={PageContainer.params}
        Container={PageContainer.container}
        token={token}
      />
    )
  }

  if (data && PageContainer) {
    return (
      <>
        <SEOComponent data={seo} />
        <PageContainer.container data={data as ExhibitionShape} />
      </>
    )
  }
  return null
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

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params = {}, draftMode = false} = ctx

  if (!params?.slug || !params.year) return {notFound: true}

  const queryParams = {slug: `${EXHIBITIONS_URL}/${params?.year}/${params?.slug}`}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const pageType = await getRecordType(queryParams)
  if (!pageType) return {notFound: true}
  let data = null
  if (pageType._type === 'exhibitionPage') {
    data = await getExhibitionPageBySlug(client, queryParams)
  }
  if (pageType._type === 'onlineExhibitionPage') {
    data = await getOnlineExhibitionsData(client, queryParams)
  }
  if (pageType._type === 'exceptionalWork') {
    data = await getExceptionalWorkData(client, queryParams)
  }

  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = EXHIBITIONS_SECTION

  if (!data) return {notFound: true}
  if (data) {
    return {
      props: {
        data,
        dataLayerProps,
        draftMode,
        queryParams,
        slug: params?.slug || null,
        token: draftViewToken,
      },
    }
  }

  return {notFound: true}
}
