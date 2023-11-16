import {useLiveQuery} from 'next-sanity/preview'
import {LiveQueryProvider} from 'next-sanity/preview'
import {Fragment} from 'react'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXIT_PREVIEW, PREVIEW_EXIT_URL} from '@/common/constants/commonCopies'
import {DzLink} from '@/components/wrappers/DzLinkWrapper'
import {getClient} from '@/sanity/client'

import styles from './index.module.css'

interface PreviewPageProps {
  data: any
  token?: string
  seo?: any
  query: string
  params?: any
  Container: any
}

const getContainer = ({Container, data}: any) => {
  if (!Container) return <Fragment />
  return <Container data={data} />
}

const ContainerData = ({data, seo, query, params = {}, Container}: PreviewPageProps) => {
  const [liveData] = useLiveQuery(data, query, params)
  const container = getContainer({Container, data: liveData})
  const componentSEO = seo

  return (
    <>
      {componentSEO && <SEOComponent data={componentSEO} />} {container}
    </>
  )
}
const PreviewPage = (props: PreviewPageProps) => {
  const {data, query, seo, params, Container, token} = props
  const client = getClient({token})

  return (
    <>
      <LiveQueryProvider client={client} logger={console}>
        <ContainerData
          data={data}
          query={query}
          seo={seo}
          params={params}
          Container={Container}
          token={token}
        />
        <DzLink className={styles.exitPreview} href={PREVIEW_EXIT_URL}>
          {EXIT_PREVIEW}
        </DzLink>
      </LiveQueryProvider>
    </>
  )
}

export default PreviewPage
