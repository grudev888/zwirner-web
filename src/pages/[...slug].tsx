import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {PreviewPage} from '@/components/containers/previews/pagePreview'
import {SpecialPagesContainer} from '@/components/containers/specialPages'
import {pageBySlug} from '@/sanity/queries/page/pageBySlug'
import {getAllPageSlugs} from '@/sanity/services/page/getAllPageSlugs'
import {getPageBySlug} from '@/sanity/services/page/getPageBySlug'
import {removePrefixSlug} from '@/utils/slug'

export default function SpecialPages(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const {data, preview, queryParams} = props
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  if (preview) {
    return <PreviewPage query={pageBySlug} params={queryParams} Container={SpecialPagesContainer} />
  }

  return (
    <>
      <SEOComponent data={data.seo} />
      <SpecialPagesContainer data={data} />
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllPageSlugs()
  return {
    paths: paths.map((item) => ({
      params: {slug: removePrefixSlug(item.params.slug, '').split('/')},
    })),
    fallback: true,
  }
}

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params = {}, preview = false, previewData = {}} = ctx
  const queryParams = {slug: `/${((params?.slug as any) ?? [])?.join('/')}`}

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        queryParams,
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const data = await getPageBySlug(queryParams)
  if (!data) return {notFound: true}

  return {
    props: {
      data,
      queryParams,
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}
