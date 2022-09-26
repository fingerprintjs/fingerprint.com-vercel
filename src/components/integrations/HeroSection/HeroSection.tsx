import React from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'
import { ReactComponent as IntegrationsSVG } from './IntegrationsSVG.svg'
import { ReactComponent as IntegrationsMobileSVG } from './IntegrationsMobileSVG.svg'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>Integrations</h1>
          <p className={styles.description}>
            Fingerprint offers seamless third party integrations, making it easy to get started quickly - whatever your
            tech stack looks like.
          </p>
        </section>
        <section className={styles.imageSection}>
          <IntegrationsSVG className={styles.integrationsCards} />
          <IntegrationsMobileSVG className={styles.integrationsCardsMobile} />
        </section>
      </Container>
    </Section>
  )
}
