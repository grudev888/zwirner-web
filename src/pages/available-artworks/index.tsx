import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import AWContainer from '@/components/containers/availableArtworks/awContainer'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {availableArtworksData} from '@/sanity/queries/availableArtworks.queries'
import {getAvailableArtworksData} from '@/sanity/services/availableArtworks.service'

interface AvailableArtworksCMS {
  artworksPage: any
}

interface PageProps {
  data: AvailableArtworksCMS
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

export default function AvailableArtworks({data, preview}: PageProps) {
  const {artworksPage = []} = data
  const [pageData] = artworksPage ?? []
  const {seo} = pageData ?? {}

  if (preview) {
    return <PreviewPage query={availableArtworksData} seo={seo} Container={AWContainer} />
  }

  return (
    <>
      <SEOComponent data={seo} />
      <AWContainer data={pageData} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'available-artworks'}

  if (preview && previewData.token) {
    return {
      props: {
        data: {
          artworksPage: null,
        },
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  try {
    const artworksPage = await getAvailableArtworksData()

    return {
      props: {
        data: {
          artworksPage,
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
      revalidate: 1,
    }
  } catch (e: any) {
    console.error('ERROR FETCHING AVAILABLE ARTWORKS DATA:', e?.response?.statusMessage)
    return {
      props: {
        data: {
          artworksPage: [],
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
