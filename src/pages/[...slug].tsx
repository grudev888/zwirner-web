import {DzColumn, DzSpinner} from '@zwirner/design-system'
import {type GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {LANDING_SECTION} from '@/common/constants/gtmPageConstants'
import PreviewPage from '@/components/containers/previews/pagePreview'
import {SpecialPagesContainer} from '@/components/containers/specialPages'
import {getClient, readToken} from '@/sanity/client'
import {pageBySlug} from '@/sanity/queries/page/pageBySlug'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {getAllPageSlugs} from '@/sanity/services/page/getAllPageSlugs'
import {getPageBySlug} from '@/sanity/services/page/getPageBySlug'
import {removePrefixSlug} from '@/utils/slug'

export default function SpecialPages(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const {data, draftMode, queryParams, token} = props
  const router = useRouter()

  if (router.isFallback) {
    return (
      <DzColumn span={12}>
        <DzSpinner />
      </DzColumn>
    )
  }
  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        seo={data.seo}
        query={pageBySlug}
        params={queryParams}
        Container={SpecialPagesContainer}
        token={token}
      />
    )
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
    fallback: false,
  }
}

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {params = {}, draftMode = false} = ctx
  const queryParams = {slug: `/${((params?.slug as any) ?? [])?.join('/')}`}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data = await getPageBySlug(client, queryParams)
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) dataLayerProps.page_data.site_section = LANDING_SECTION
  if (!data) return {notFound: true}

  return {
    props: {
      data,
      dataLayerProps,
      queryParams,
      draftMode,
      slug: params?.slug || null,
      token: draftViewToken,
    },
  }
}
