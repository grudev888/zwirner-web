import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {ARTISTS_URL} from '@/common/constants/commonCopies'
import {PressContainer} from '@/components/containers/artists/artistsPress'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {artistPressPageBySlug} from '@/sanity/queries/artistsPress.queries'
import {getAllPressPages, getPressDataBySlug} from '@/sanity/services/artistsPress.service'
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

export default function PressPage({data, preview, queryParams}: PageProps) {
  const [PressPageData] = data ?? []
  const {seo} = PressPageData ?? {}

  if (preview) {
    return (
      <PreviewPage query={artistPressPageBySlug} params={queryParams} Container={PressContainer} />
    )
  }

  return (
    <>
      <SEOComponent data={seo} />
      <PressContainer data={PressPageData} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllPressPages()
  return {
    paths: paths?.map((item: any) => ({
      params: {slug: removePrefixSlug(item.params.slug, '/artists/')},
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

  const data = await getPressDataBySlug(queryParams)

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
