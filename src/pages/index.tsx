import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'

import {client} from '../sanity/client'
import {LazyPreviewPage} from '../sanity/page/LazyPreviewPage'
import {LoadingScreen} from '../sanity/page/LoadingScreen'
import {PageScreen} from '../sanity/page/PageScreen'
import {PAGE_DATA_QUERY} from '../sanity/page/query'
import {PageData} from '../sanity/page/types'

interface PageProps {
  data: PageData | null
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

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'home'}

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const data = await client.fetch<PageData | null>(PAGE_DATA_QUERY, params)

  return {
    props: {
      data,
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}

export default function Page(props: PageProps) {
  const {data, preview, slug, token} = props

  if (preview) {
    return (
      <PreviewSuspense fallback={<LoadingScreen>Loading preview…</LoadingScreen>}>
        <LazyPreviewPage slug={slug} token={token} />
      </PreviewSuspense>
    )
  }

  return <PageScreen data={data} />
}
