import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'

import {PageBuilder} from '@/components/pageBuilder'
import {PreviewPageBuilder} from '@/components/pageBuilder/previewPageBuilder'
import {pageBuilderMap} from '@/sanity/mappers/pageBuilder/pagebuilderMapper'
import {exhibitionPageBySlug} from '@/sanity/queries/exhibitionPage.queries'
import {getAllExhibitionPagesSlugs, getExhibitionPageBySlug} from '@/sanity/services/exhibition.service'


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

export default function ExhibitionsPage({data = {}, preview}: PageProps) {
  if (preview) {
    const {queryParams} = data
    return (
      <DzColumn className="h-screen" span={12}>
        <PreviewSuspense fallback="Loading...">
          <PreviewPageBuilder query={exhibitionPageBySlug} params={queryParams} isSingle/>
        </PreviewSuspense>
      </DzColumn>
    )
  }

  return <PageBuilder components={data.sections} />
}

export const getStaticPaths = async () => {
  const paths = await getAllExhibitionPagesSlugs()
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

  const data: any = await getExhibitionPageBySlug(queryParams)

  return {
    props: {
      data: {...data, queryParams, sections: pageBuilderMap([data]), unmapped: [data]},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
