import {DzColumn} from '@zwirner/design-system'
import {type GetStaticPropsContext} from 'next'
import React from 'react'

import {SUBSCRIBE_SECTION, SUBSCRIBE_SLUG} from '@/common/constants/gtmPageConstants'
import {useNewsletterFormModal} from '@/components/containers/ctaModalListener/useNewsletterFormModal'
import {getGTMPageLoadData} from '@/sanity/services/gtm/pageLoad.service'

export const SubscribePage = () => {
  const {NewsletterFormModal} = useNewsletterFormModal({disableBackdrop: true})

  return (
    <DzColumn span={12} className="min-h-[calc(100vh-60px-90px)]">
      {NewsletterFormModal}
    </DzColumn>
  )
}

export const getStaticProps = async (
  ctx: GetStaticPropsContext & {previewData?: {token?: string}}
) => {
  const {preview = false, previewData = {}} = ctx

  const queryParams = {slug: SUBSCRIBE_SLUG}

  if (preview && previewData.token) {
    return {
      props: {
        data: null,
        preview,
        token: previewData.token,
      },
    }
  }

  const dataLayerProps = await getGTMPageLoadData(queryParams)
  if (dataLayerProps) {
    dataLayerProps.page_data.site_section = SUBSCRIBE_SECTION
    dataLayerProps.page_data.page_update_date = ''
  }
  return {
    props: {
      data: {},
      dataLayerProps,
      preview: false,
      token: null,
    },
  }
}

export default SubscribePage
