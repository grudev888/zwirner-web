import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {ExceptionalWorkContainer} from '@/components/containers/exhibitions/exceptionalWorkContainer'
import {ExhibitionsContainer} from '@/components/containers/exhibitions/exhibitionDetailContainer/exhibitions'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {exhibitionPageBySlug} from '@/sanity/queries/exhibitions/exhibitionPageBySlug'
import {getAllExhibitionPagesSlugs} from '@/sanity/services/exhibitions/getAllExhibitionPagesSlugs'
import {getExceptionalWorkData} from '@/sanity/services/exhibitions/getExceptionalWorkData'
import {getExhibitionPageBySlug} from '@/sanity/services/exhibitions/getExhibitionPageBySlug'
import {getRecordType} from '@/sanity/services/exhibitions/getRecordType'

export default function ExhibitionsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const {data, queryParams, preview} = props
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (preview) {
    return (
      <PreviewPage
        query={exhibitionPageBySlug}
        params={queryParams}
        Container={ExhibitionsContainer}
      />
    )
  }
  if (data._type === 'exhibitionPage') {
    return (
      <>
        <SEOComponent data={data.seo} />
        <ExhibitionsContainer data={data} />
      </>
    )
  }
  if (data._type === 'exceptionalWork') {
    return (
      <>
        <SEOComponent data={data.seo} />
        <ExceptionalWorkContainer data={data} />
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

  if (pageType._type === 'exhibitionPage') {
    const data = await getExhibitionPageBySlug(queryParams)
    if (!data) return {notFound: true}

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
  if (pageType._type === 'exceptionalWork') {
    const data = await getExceptionalWorkData(queryParams)
    if (!data) return {notFound: true}

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
