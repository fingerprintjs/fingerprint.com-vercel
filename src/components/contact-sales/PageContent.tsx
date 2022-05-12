import React from 'react'

import Container from '../common/Container'
import Section from '../common/Section'
import ContactSalesForm from '../ContactSalesForm'
import { ReactComponent as BotD } from '../../img/BotdBowl.svg'
import { PATH, MAILTO_SALES } from '../../constants/content'

import styles from './contact-sales.module.scss'

export default function PageContent() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <section className={styles.contactSalesSection}>
          <ContactSalesForm />
          <div className={styles.poweredBy}>
            <p className={styles.botdDescription}>
              <span>
                <BotD className={styles.botD} />
              </span>
              <span>
                Our form spam detection is powered by{' '}
                <a className={styles.link} href={PATH.botD}>
                  BotD
                </a>
                .
              </span>
            </p>
            <p className={styles.text}>
              If you have problems with submission please{' '}
              <a className={styles.link} href={MAILTO_SALES.mailToUrl}>
                contact us via email
              </a>
              .
            </p>
          </div>
        </section>
        <ClientsSection />
      </Container>
    </Section>
  )
}

function ClientsSection() {
  const clients = ['coinbase', 'yahoo', 'agoda', 'us-bank', 'ebay', 'target', 'booking', 'checkout-com']

  return (
    <Section className={styles.clients}>
      <header className={styles.header}>
        <h2 className={styles.title}>Join over 8,000 websites using Fingerprint to prevent fraud</h2>
      </header>
      <div className={styles.content}>
        {clients.map((client) => {
          return (
            <span key={`slide_${client}`} className={styles.slide}>
              <img alt={`${client} logo`} className={styles.logo} src={`/img/company-logos/${client}.svg`} />
            </span>
          )
        })}
      </div>
    </Section>
  )
}
