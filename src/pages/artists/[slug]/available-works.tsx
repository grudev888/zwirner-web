import {GetStaticProps} from 'next'

import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import {getAllArtistAvailableArtworkPageSlugs} from '@/sanity/services/artist.service'
import {getAvailableArtworksDataByArtistSlug} from '@/sanity/services/availableArtworks.service'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {availableArtworksDataByArtistSlug} from '@/sanity/queries/availableArtworks.queries'
import {SEOComponent} from '@/common/components/seo/seo'
import ArtistsPageLayout from '@/components/containers/layout/pages/artistsPageLayout'

interface AvailableArtworksCMS {
  artworksPage: any
  slug: {current: string}
  title: string
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

export default function AvailableWorksPage({data, preview}: PageProps) {
  const subPageData = data?.artworksPage[0].availableWorksSubpage
  const pageData = {artworksGrid: subPageData, title: subPageData?.title}
  const parentPath = data?.artworksPage[0].slug?.current
  const parentPageTitle = data?.artworksPage[0].title
  const {seo} = subPageData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={availableArtworksDataByArtistSlug}
        seo={seo}
        type={PREVIEW_PAGE_TYPE.AVAILABLE_WORKS}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistsPageLayout parentPageName={parentPageTitle} parentPath={parentPath}>
        <AvailableArtworksContainer data={pageData} />
      </ArtistsPageLayout>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistAvailableArtworkPageSlugs()
  return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx

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
    const data = await getAvailableArtworksDataByArtistSlug({
      slug: `/artists/${params.slug}`,
    })

    return {
      props: {
        data: {
          artworksPage: data,
        },
        preview,
        slug: params?.slug || null,
        token: null,
      },
    }
  } catch (e: any) {
    console.error('ERROR FETCHING ARTIST AVAILABLE ARTWORKS DATA:', e.message)
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
