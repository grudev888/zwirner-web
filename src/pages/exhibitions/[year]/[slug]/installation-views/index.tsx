import {GetStaticProps} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXHIBITIONS_URL} from '@/common/constants/commonCopies'
import {InstallationViewsContainer} from '@/components/containers/exhibitions/exhibitionViewsContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {installationViewsBySlug} from '@/sanity/queries/exhibitions/installationViewsBySlug'
import {getAllExhibitionPagesSlugs} from '@/sanity/services/exhibitions/getAllExhibitionPagesSlugs'
import {getExhibitionInstallationViews} from '@/sanity/services/exhibitions/getExhibitionInstallationViews'

interface PageProps {
  data: any
  preview: boolean
  slug: string | null
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

// TODO: update component typings to infer correct types
export default function SubPageInstallationView({data = {}, preview}: PageProps) {
  const {pageData = {}, queryParams} = data ?? {}
  const {seo} = pageData ?? {}
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (preview) {
    return (
      <PreviewPage
        query={installationViewsBySlug}
        params={queryParams}
        seo={seo}
        Container={InstallationViewsContainer}
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

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx
  const queryParams = {slug: `${EXHIBITIONS_URL}/${params?.year}/${params?.slug}`}

  if (preview && previewData.token) {
    return {
      props: {
        data: {queryParams},
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const data = await getExhibitionInstallationViews(queryParams)
  if (!data) return {notFound: true}

  return {
    props: {
      data: {queryParams, pageData: data},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
