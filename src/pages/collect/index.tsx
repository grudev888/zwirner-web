import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {CollectContainer} from '@/components/containers/collect'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {collectPageData} from '@/sanity/queries/collect.queries'
import {getCollectData} from '@/sanity/services/collect.service'

interface CollectDataCMS {
  collectData: any
}

interface PageProps {
  data: CollectDataCMS
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

export default function Collect({data, preview}: PageProps) {
  const {collectData = []} = data
  const [collect] = collectData ?? []
  const {seo} = collect ?? {}

  if (preview) {
    return <PreviewPage query={collectPageData} seo={seo} Container={CollectContainer} />
  }

  return (
    <>
      <SEOComponent data={seo} />
      <CollectContainer data={collect} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'collect'}

  if (preview && previewData.token) {
    return {
      props: {
        data: {
          collectData: null,
        },
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  try {
    const collectPage = await getCollectData()
    return {
      props: {
        data: {
          collectData: collectPage,
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING COLLECT:', e?.response?.statusMessage)
    return {
      props: {
        data: {
          collectData: [],
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
