import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'

import {PageBuilder} from '@/components/pageBuilder'
import {PreviewPageBuilder} from '@/components/pageBuilder/previewPageBuilder'
import {homeMapper} from '@/sanity/mappers/pageBuilder/homeMapper'
import {artistPageBySlug} from '@/sanity/queries/artist.queries'
import {getAllArtistPageSlugs, getArtistPageBySlug} from '@/sanity/services/artist.service'

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

export default function ArtistPage({data = {}, preview}: PageProps) {
  if (preview) {
    const {queryParams} = data
    return (
      <PreviewSuspense fallback="Loading...">
        <PreviewPageBuilder query={artistPageBySlug} params={queryParams} isSingle />
      </PreviewSuspense>
    )
  }

  return <PageBuilder rows={data.sections} />
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistPageSlugs()
  return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {params = {}, preview = false, previewData = {}} = ctx

  const queryParams = {slug: params?.slug ?? ``}

  if (preview && previewData.token) {
    return {
      props: {
        data: {queryParams},
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const data: any = await getArtistPageBySlug(queryParams)

  return {
    props: {
      data: {...data, queryParams, sections: homeMapper([data]), unmapped: [data]},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
