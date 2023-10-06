import {GetStaticPropsContext} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {ExceptionalWorkContainer} from '@/components/containers/exhibitions/exceptionalWorkContainer'
import {ExhibitionsContainer} from '@/components/containers/exhibitions/exhibitionDetailContainer/exhibitions'
import {OnlineExhibitionsContainer} from '@/components/containers/exhibitions/onlineExhibitionsContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
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

type ExhibitionShape = ExceptionalWorksDataType | ExhibitionPageBySlugType | OnlineExhibitionsType
type ExhibitionsPageProps = {
  data: ExhibitionShape
  preview: boolean
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
  const {data, queryParams, preview} = props
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

  if (preview && PageContainer) {
    return (
      <PreviewPage
        query={PageContainer.query}
        params={PageContainer.params}
        Container={PageContainer.container}
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

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params = {}, preview = false, previewData} = ctx

  if (!params?.slug || !params.year) return {notFound: true}

  const queryParams = {slug: `${EXHIBITIONS_URL}/${params?.year}/${params?.slug}`}

  if (preview && previewData?.token) {
    return {
      props: {
        data: null,
        preview,
        queryParams,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const pageType = await getRecordType(queryParams)
  if (!pageType) return {notFound: true}
  let data = null
  if (pageType._type === 'exhibitionPage') {
    data = await getExhibitionPageBySlug(queryParams)
  }
  if (pageType._type === 'onlineExhibitionPage') {
    data = await getOnlineExhibitionsData(queryParams)
  }
  if (pageType._type === 'exceptionalWork') {
    data = await getExceptionalWorkData(queryParams)
  }

  if (!data) return {notFound: true}
  if (data) {
    return {
      props: {
        data,
        preview,
        queryParams,
        slug: params?.slug || null,
        token: null,
      },
    }
  }

  return {notFound: true}
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
