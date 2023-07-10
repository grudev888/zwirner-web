import {GetStaticProps} from 'next'

import {AvailableArtworksContainer} from '@/components/containers/availableArtworks'
import {getAllArtistAvailableArtworkPageSlugs} from '@/sanity/services/artist.service'
import {getAvailableArtworksDataByArtistSlug} from '@/sanity/services/availableArtworks.service'
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

export default function AvailableWorksPage({data}: PageProps) {
  const subPageData = data?.artworksPage[0].availableWorksSubpage
  const pageData = {artworksGrid: subPageData, title: subPageData?.title}
  const parentPath = data?.artworksPage[0].slug?.current
  const parentPageTitle = data?.artworksPage[0].title
  const {seo} = subPageData ?? {}

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

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {params = {}} = ctx

  try {
    const data = await getAvailableArtworksDataByArtistSlug({
      slug: `/artists/${params.slug}`,
    })

    return {
      props: {
        data: {
          artworksPage: data,
        },
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
        slug: params?.slug || null,
        token: null,
      },
    }
  }
}
