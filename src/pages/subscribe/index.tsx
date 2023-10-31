import {DzColumn} from '@zwirner/design-system'
import {GetStaticProps} from 'next'
import React from 'react'

import {SUBSCRIBE_SECTION, SUBSCRIBE_SLUG} from '@/common/constants/gtmPageConstants'
import {useNewsletterFormModal} from '@/components/containers/ctaModalListener/useNewsletterFormModal'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

import styles from './subscribePage.module.css'

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
export const SubscribePage = () => {
  const {NewsletterFormModal} = useNewsletterFormModal(true)

  return (
    <DzColumn span={12} className={styles.fullHeightContent}>
      {NewsletterFormModal}
    </DzColumn>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const {preview = false, previewData = {}} = ctx

  const params = {slug: SUBSCRIBE_SLUG}

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        preview,
        slug: params?.slug || null,
        token: previewData.token,
      },
    }
  }

  const dataLayerProps = await getGTMPageLoadData(params)
  if (dataLayerProps) dataLayerProps.page_data.site_section = SUBSCRIBE_SECTION
  return {
    props: {
      data: {},
      dataLayerProps,
      preview,
      slug: params?.slug || null,
      token: null,
    },
  }
}

export default SubscribePage
