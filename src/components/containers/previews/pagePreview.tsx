import {DzLink} from '@zwirner/design-system'
import {PreviewSuspense} from 'next-sanity/preview'
import {FC, Fragment} from 'react'

import {SEOComponent} from '@/common/components/seo/seo'
import {EXIT_PREVIEW, PREVIEW_EXIT_URL} from '@/common/constants/commonCopies'
import {usePreview} from '@/sanity/preview'

import styles from './index.module.css'

interface PreviewPageProps {
  seo?: any
  query: string
  params?: any
  Container: any
}

const getData = (data: any) => {
  if (data && Array.isArray(data)) {
    const [previewData] = data ?? []
    return previewData
  }
  if (data && typeof data === 'object') {
    return data
  }
  return null
}

const getContainer = ({Container, data}: any) => {
  if (!Container) return <Fragment />
  return <Container data={data} />
}

const ContainerData: FC<PreviewPageProps> = ({seo, query, params = {}, Container}) => {
  const data = usePreview(null, query, params)
  const componentData = getData(data)
  const container = getContainer({Container, data: componentData})
  const componentSEO = seo || componentData?.seo

  return (
    <>
      {componentSEO && <SEOComponent data={componentSEO} />} {container}
    </>
  )
}

export const PreviewPage: FC<PreviewPageProps> = ({seo, query, params = {}, Container}) => {
  return (
    <>
      <PreviewSuspense fallback="Loading...">
        <ContainerData seo={seo} query={query} params={params} Container={Container} />
        <DzLink className={styles.exitPreview} href={PREVIEW_EXIT_URL}>
          {EXIT_PREVIEW}
        </DzLink>
      </PreviewSuspense>
    </>
  )
}

export default PreviewPage
