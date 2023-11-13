import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import {ErrorBoundary} from 'react-error-boundary'

import {SEOComponent} from '@/common/components/seo/seo'
import {DRAFT_MODE_SANITY_READ_TOKEN_ERROR} from '@/common/constants/errorMessages'
import {ARTISTS_SECTION} from '@/common/constants/gtmPageConstants'
import {ArtistDetailContainer} from '@/components/containers/artists/ArtistDetailContainer'
import PreviewPage from '@/components/containers/previews/pagePreview'
import type {SharedPageProps} from '@/pages/_app'
import {getClient, readToken} from '@/sanity/client'
import {artistPageBySlug} from '@/sanity/queries/artistPage.queries'
import {getArtistPageBySlug} from '@/sanity/services/artist.service'
import {getAllArtistPageSlugs} from '@/sanity/services/artists/getAllArtistPageSlugs'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'
import {removePrefixSlug} from '@/utils/slug'

export default function ArtistPage({data = {}, draftMode, queryParams, token}: SharedPageProps) {
  if (draftMode) {
    return (
      <PreviewPage
        data={data}
        query={artistPageBySlug}
        seo={data.seo}
        params={queryParams}
        Container={ArtistDetailContainer}
        token={token}
      />
    )
  }

  return (
    <>
      <ErrorBoundary
        fallback={
          <DzColumn className="mb-12 h-screen" span={12}>
            <div className="flex justify-center p-5">Something went wrong</div>
          </DzColumn>
        }
      >
        <SEOComponent data={data.seo} />
        {data.artist ? <ArtistDetailContainer data={data} /> : null}
      </ErrorBoundary>
    </>
  )
}

export const getStaticPaths = async () => {
  const paths = await getAllArtistPageSlugs()
  return {
    paths: paths.map(({params}) => ({
      params: {slug: removePrefixSlug(params.slug, '/artists/')},
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {params = {}, draftMode = false} = ctx

  const queryParams = {slug: `/artists/${params?.slug ?? ``}`}

  const draftViewToken = draftMode ? readToken : ``
  if (draftMode && !draftViewToken) {
    throw new Error(DRAFT_MODE_SANITY_READ_TOKEN_ERROR)
  }
  const client = getClient(draftMode ? {token: draftViewToken} : undefined)

  const data: any = await getArtistPageBySlug(client, queryParams)
  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) {
    dataLayerProps.page_data.artist = data[0]?.artist?.fullName || ''
    dataLayerProps.page_data.site_section = ARTISTS_SECTION
  }
  if (!data) return {notFound: true}

  return {
    props: {
      data,
      dataLayerProps,
      slug: params?.slug || null,
      token: draftViewToken,
      queryParams,
      draftMode,
    },
    revalidate: 1,
  }
}
