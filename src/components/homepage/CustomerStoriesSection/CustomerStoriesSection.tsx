import React from 'react'

import Container from '../../common/Container'

import styles from './CustomerStoriesSection.module.scss'
import { ReactComponent as CheckoutSVG } from '../../../../static/img/company-logos/checkout.svg'

export default function CustomerStoriesSection() {
  return (
    <Container size='large' className={styles.container}>
      <div className={styles.labelWrapper}>
        <span className={styles.label}>Customer Stories</span>
      </div>
      <a className={styles.logoSection} href='https://www.checkout.com/' target='_blank' rel='noreferrer'>
        <CheckoutSVG className={styles.logo} />
      </a>
      <div className={styles.quoteSection}>
        <p className={styles.quote}>
          “With Fingerprint, we&apos;re able to identify fraudulent payment attempts with higher accuracy. The developer
          experience was outstanding - we got all the way to production in less than a week.”
        </p>
        <p className={styles.author}>Pierre Roudaut</p>
        <p className={styles.position}>Senior Engineering Manager - Fraud Detection</p>
      </div>
    </Container>
  )
}
