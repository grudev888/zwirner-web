import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ConsignmentsContainer} from '@/components/containers/consignments'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {consignmentsData as consignmentsQuery} from '@/sanity/queries/consignments.queries'
import {getConsignmentsData} from '@/sanity/services/consignments.service'

interface HomeDataCMS {
  consignmentsData: any
}

interface PageProps {
  data: HomeDataCMS
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

export default function Home({data, preview}: PageProps) {
  const {consignmentsData = []} = data
  const [consignments] = consignmentsData ?? []
  const {seo} = consignments ?? {}

  if (preview) {
    return <PreviewPage query={consignmentsQuery} seo={seo} type={PREVIEW_PAGE_TYPE.CONSIGNMENTS} />
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ConsignmentsContainer data={consignments} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'consignments'}

  if (preview && previewData.token) {
    return {
      props: {
        data: {
          consignmentsData: null,
        },
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  try {
    const consignmentsPage = await getConsignmentsData()
    return {
      props: {
        data: {
          consignmentsData: consignmentsPage,
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING CONSIGNMENTS:', e?.response?.statusMessage)
    return {
      props: {
        data: {
          consignmentsData: [],
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
