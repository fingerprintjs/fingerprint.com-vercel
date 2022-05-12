import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as EmailSVG } from './emailSVG.svg'
import { ReactComponent as EmailMobileSVG } from './emailMobileSVG.svg'

import styles from './HowMuchLosingSection.module.scss'

export default function HowMuchLosingSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <section className={styles.imageSectionMobile}>
          <EmailMobileSVG className={styles.heroImage} />
        </section>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>How Much Revenue Are You Leaving On The Table From Account Sharing?</h1>
          <p className={styles.description}>
            Subscription sharing costs businesses over 9.1 billion a year and opens you up to security vulnerabilities.
            It is impossible to measure the true costs to your business without an accurate detection method.
          </p>
          <p className={styles.description}>
            Let us scope out the extent of your account sharing problem by booking a call with us. We will work with
            your team to set up a trial of Fingerprint Account Sharing Prevention and determine the revenue impact to
            your business.
          </p>
        </section>
        <section className={styles.imageSection}>
          <EmailSVG className={styles.heroImage} />
        </section>
      </Container>
    </Section>
  )
}
