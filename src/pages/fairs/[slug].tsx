import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'

import {PageBuilder} from '@/components/pageBuilder'
import {PreviewPageBuilder} from '@/components/pageBuilder/previewPageBuilder'
import {homeMapper} from '@/sanity/mappers/pageBuilder/homeMapper'
import {pageBuilderMap} from '@/sanity/mappers/pageBuilder/pagebuilderMapper'
import {fairPageBySlug} from '@/sanity/queries/fairPage.queries'
import {getAllFairPagesSlugs, getFairPageBySlug} from '@/sanity/services/fairs.service'

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

export default function FairsPage({data = {}, preview}: PageProps) {
  if (preview) {
    const {queryParams} = data
    return (
      <DzColumn className="h-screen" span={12}>
        <PreviewSuspense fallback="Loading...">
          <PreviewPageBuilder query={fairPageBySlug} params={queryParams} isSingle />
        </PreviewSuspense>
      </DzColumn>
    )
  }

  return <PageBuilder components={data.sections} />
}

export const getStaticPaths = async () => {
  const paths = await getAllFairPagesSlugs()
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

  const data: any = await getFairPageBySlug(queryParams)

  return {
    props: {
      data: {...data, queryParams, sections: pageBuilderMap([data]), unmapped: [data]},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
