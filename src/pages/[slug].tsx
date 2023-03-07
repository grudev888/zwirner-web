import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'
import {lazy} from 'react'

import {SingleExhibition} from '@/components/exhibitions/singleExhibition'
import {getAllPageSlugs, getPageBySlug} from '@/sanity/services/page.service'
const SinglePreview = lazy(() => import('@/components/exhibitions/preview/singlePreview'))

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

export default function Page({data = {}, preview}: PageProps) {
  const {exhibition = {}, queryParams} = data

  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <SinglePreview queryParams={queryParams} />
      </PreviewSuspense>
    )
  }

  return <SingleExhibition exhibition={exhibition} />
}

export const getStaticPaths = async () => {
  const paths = await getAllPageSlugs()
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

  const data = await getPageBySlug(queryParams)

  return {
    props: {
      data: {...data, queryParams},
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
