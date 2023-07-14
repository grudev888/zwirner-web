import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ArtistsListContainer} from '@/components/containers/artists/ArtstListContainer'
import {PREVIEW_PAGE_TYPE} from '@/components/containers/previews/pagePreview'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {getAllArtistsPages} from '@/sanity/queries/artistPage.queries'
import {getArtistPageData} from '@/sanity/services/artist.service'

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

export default function Artists({data, preview}: PageProps) {
  const {pageInfo} = data
  const [pagesInfoData] = pageInfo

  const {seo} = pagesInfoData ?? {}

  if (preview) {
    return (
      <PreviewPage query={getAllArtistsPages} seo={seo} type={PREVIEW_PAGE_TYPE.ARTISTS_LIST} />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistsListContainer data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'artists'}

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

  const artistPage = await getArtistPageData()
  return {
    props: {
      data: artistPage,
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
