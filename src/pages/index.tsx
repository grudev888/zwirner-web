import {GetStaticProps} from 'next'

import {ExhibitionsContainer} from '@/components/exhibitions/exhibitionContainer'
import {getAllExhibitions} from '@/sanity/services/exhibition.service'

interface PageProps {
  exhibitions: any
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

export default function Page({exhibitions}: PageProps) {
  return (
    <main className="mt-5 flex min-h-screen justify-center">
      <ExhibitionsContainer exhibitions={exhibitions} />
    </main>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: 'home'}

  if (preview && previewData.token) {
    return {
      props: {
        exhibitions: null,
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const [exhibitions] = await Promise.all([getAllExhibitions()])

  return {
    props: {
      exhibitions,
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
