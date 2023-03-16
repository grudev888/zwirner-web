import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {PreviewSuspense} from 'next-sanity/preview'

import {PageBuilder} from '@/components/pageBuilder'
import {PreviewPageBuilder} from '@/components/pageBuilder/previewPageBuilder'
import {homeMapper} from '@/sanity/mappers/pageBuilder/homeMapper'
import {getAllExhibitions} from '@/sanity/services/exhibition.service'
import {getHomePage} from '@/sanity/services/page.service'

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

export default function Page({data, preview}: PageProps) {
  if (preview) {
    return (
      <DzColumn className="h-screen" start={[1, 2]} span={[12, 10]}>
        <PreviewSuspense fallback="Loading...">
          <PreviewPageBuilder />
        </PreviewSuspense>
      </DzColumn>
    )
  }
  return (
    <DzColumn className="h-screen" start={[1, 2]} span={[12, 10]}>
      <PageBuilder sections={data.home} />
      {/* <ExhibitionsContainer exhibitions={data.exhibitions} /> */}
    </DzColumn>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'home'}

  if (preview && previewData.token) {
    return {
      props: {
        data: {
          exhibitions: null,
          homePage: null,
        },
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const [exhibitions, homePage] = await Promise.all([getAllExhibitions(), getHomePage()])

  return {
    props: {
      data: {
        exhibitions,
        home: homeMapper(homePage),
      },
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
