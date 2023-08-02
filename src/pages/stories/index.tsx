import {GetStaticProps} from 'next'

import {SEOComponent} from '@/common/components/seo/seo'
import {PREVIEW_PAGE_TYPE, PreviewPage} from '@/components/containers/previews/pagePreview'
import {StoriesContainer} from '@/components/containers/storiesPage'
import {storiesData} from '@/sanity/queries/stories.queries'
import {getStoriesData} from '@/sanity/services/stories.service'
interface StoriesDataCMS {
  stories: any
}

interface PageProps {
  data: StoriesDataCMS
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function StoriesEditions({data, preview}: PageProps) {
  const {stories = []} = data
  const [storiesDataCMS] = stories ?? []
  const {seo} = storiesDataCMS ?? {}

  if (preview) {
    return <PreviewPage query={storiesData} seo={seo} type={PREVIEW_PAGE_TYPE.STORIES} />
  }

  return (
    <>
      <SEOComponent data={seo} />
      <StoriesContainer data={storiesDataCMS} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  if (preview && previewData.token) {
    return {
      props: {
        data: {
          stories: null,
        },
        preview,
        token: previewData.token,
      },
    }
  }

  const storiesPage = await getStoriesData()
  return {
    props: {
      data: {
        stories: storiesPage,
      },
      preview,
      token: null,
    },
  }
}
