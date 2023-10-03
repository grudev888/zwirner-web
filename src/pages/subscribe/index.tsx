import {DzColumn} from '@zwirner/design-system'
import React from 'react'

import {useNewsletterFormModal} from '@/components/containers/ctaModalListener/useNewsletterFormModal'

import styles from './subscribePage.module.css'

export const SubscribePage = () => {
  const {NewsletterFormModal} = useNewsletterFormModal(true)

  return (
    <DzColumn span={12} className={styles.fullHeightContent}>
      {NewsletterFormModal}
    </DzColumn>
  )
}

export default SubscribePage
