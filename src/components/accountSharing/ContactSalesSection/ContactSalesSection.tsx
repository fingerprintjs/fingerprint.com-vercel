import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { PATH } from '../../../constants/content'

import styles from './ContactSalesSection.module.scss'

export default function ContactSalesSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.titleContainer}>
        <h1 className={styles.title}>
          Learn how Fingerprint Pro can help your business build a custom solution to prevent account sharing and unlock
          new revenue.
        </h1>
        <Button href={PATH.contactSales} variant='primary' size='big' className={styles.button}>
          Talk to sales
        </Button>
      </Container>
    </Section>
  )
}
