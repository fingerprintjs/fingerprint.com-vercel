import React from 'react'
import styles from './HeroSection.module.scss'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { ReactComponent as HeroSvg } from './HeroSvg.svg'

export default function HeroSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.heroContainer}>
        <div className={styles.contentSection}>
          <p className={styles.caption}>Solutions</p>
          <h1 className={styles.title}>Build your own anti-fraud stack</h1>
          <p className={styles.description}>
            Virtually all online fraud can be prevented with accurate visitor identification. Fingerprint makes
            designing effective anti-fraud workflows easy for any developer team.
          </p>
        </div>
        <div className={styles.imageSection}>
          <HeroSvg className={styles.image} />
        </div>
      </Container>
    </Section>
  )
}
