import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'
import {ErrorBoundary} from 'react-error-boundary'

import {SEOComponent} from '@/common/components/seo/seo'
import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'

import {availableArtworksData} from '@/sanity/queries/availableArtworks.queries'
import {getAvailableArtworksData} from '@/sanity/services/availableArtworks.service'
import {PreviewAvailableWorks} from '@/components/containers/availableArtworks/previewAvailableWorks'

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
  const {seo, artworks = [], displayNumberOfResults, title} = pageData ?? {}

  if (preview) {
    return (
      <>
        <ErrorBoundary
          fallback={
            <DzColumn className="mb-12 h-full" span={12}>
              <div className="flex justify-center p-5">Something went wrong</div>
            </DzColumn>
          }
        >
          <SEOComponent data={seo} />
          <PreviewSuspense fallback="Loading...">
            <PreviewAvailableWorks query={availableArtworksData} />
          </PreviewSuspense>
        </ErrorBoundary>
      </>
    )
  }

  return (
    <>
      <ErrorBoundary
        fallback={
          <DzColumn className="mb-12 h-full" span={12}>
            <div className="flex justify-center p-5">Something went wrong</div>
          </DzColumn>
        }
      >
        <SEOComponent data={seo} />
        <AvailableArtworksContainer data={{artworks, displayNumberOfResults, title}} />
      </ErrorBoundary>
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
