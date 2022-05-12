import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import styles from './ClientsSection.module.scss'

import { ReactComponent as HomeCreditSVG } from '../../../../static/img/company-logos/home-credit.svg'
import { ReactComponent as ZipSVG } from '../../../../static/img/company-logos/zip.svg'
import { ReactComponent as SimplSVG } from '../../../../static/img/company-logos/simpl.svg'

export default function ClientsSection() {
  return (
    <Section className={styles.clients}>
      <Container size='large'>
        <header className={styles.header}>
          <h2 className={styles.title}>Fingerprint is trusted by:</h2>
        </header>
        <div className={styles.content}>
          <HomeCreditSVG className={styles.homeCredit} />
          <ZipSVG className={styles.zip} />
          <SimplSVG className={styles.simpl} />
        </div>
      </Container>
    </Section>
  )
}
