import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ARTISTS_URL} from '@/common/constants/commonCopies'
import {ArtistGuideContainer} from '@/components/containers/artists/guide'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {artistGuidePageBySlug} from '@/sanity/queries/artistsGuide.queries'
import {getAllGuidePages, getGuideDataBySlug} from '@/sanity/services/artistsGuide.service'
import {removePrefixSlug} from '@/utils/slug'

interface PageProps {
  data: any
  preview: boolean
  slug: string | null
  queryParams: any
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function GuidePage({data, preview, queryParams}: PageProps) {
  const [guidePageData] = data ?? []
  const {seo} = guidePageData ?? {}

  if (preview) {
    return (
      <PreviewPage
        query={artistGuidePageBySlug}
        params={queryParams}
        Container={ArtistGuideContainer}
      />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <ArtistGuideContainer data={guidePageData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllGuidePages()
  return {
    paths: paths?.map((item: any) => ({
      params: {slug: removePrefixSlug(item.params.slug, `${ARTISTS_URL}/`)},
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false} = ctx

  const queryParams = {slug: `${ARTISTS_URL}/${params?.slug}` ?? ``}

  if (preview) {
    return {
      props: {
        data: null,
        preview,
        slug: params?.slug || null,
        queryParams,
      },
    }
  }

  const data = await getGuideDataBySlug(queryParams)

  return {
    props: {
      data,
      preview,
      slug: params?.slug || null,
      queryParams,
    },
    revalidate: 1,
  }
}
