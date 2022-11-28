import React from 'react'
import Container from '../../common/Container'
import Chart from './Chart'
import styles from './WhyFingerprintSection.module.scss'

export default function WhyFingerprintSection() {
  return (
    <Container className={styles.container} size='large'>
      <section className={styles.section}>
        <header className={styles.header}>
          <div className={styles.labelWrapper}>
            <span className={styles.label}>why fingerprint</span>
          </div>
          <h2 className={styles.title}>The world’s most accurate visitor identifier</h2>
          <p className={styles.description}>
            As third-party cookies are deprecated and changes to browsers and operating systems make identity more
            challenging, we are focused on ensuring our accuracy is the highest on the market.
          </p>
        </header>
        <div className={styles.cards}>
          <Card title='99.5% Accuracy'>
            Highest identification accuracy using fingerprinting, fuzzy matching and server-side techniques.
          </Card>
          <Card title='Permanent Identifier'>
            Pro&apos;s VisitorID will remain the same for years, even as browsers are upgraded.
          </Card>
          <Card title='Identify Bots and Humans'>
            Distinguish bots and humans in the platform in order to build more intelligent workflows.
          </Card>
        </div>
        <div className={styles.chartWrapper}>
          <Chart />
        </div>
      </section>
    </Container>
  )
}

interface CardsProps {
  title: string
  children: string
}
function Card({ title, children }: CardsProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{children}</p>
    </div>
  )
}
