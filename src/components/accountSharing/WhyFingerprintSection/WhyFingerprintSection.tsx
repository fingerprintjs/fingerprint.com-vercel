import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as LayersSVG } from './LayersSVG.svg'
import { ReactComponent as VisitorsSVG } from './VisitorsSVG.svg'

import styles from './WhyFingerprintSection.module.scss'

export default function WhyFingerprintSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>Why is Fingerprint the #1 Choice For Account Sharing Prevention?</h1>
          <p className={styles.description}>Catch account sharers where other tracking methods fail.</p>
          <p className={styles.description}>
            Mobile devices, infrequent logins, and privacy browsing make detecting account sharing difficult. An account
            can be misidentified as having multiple owners if their browsing behavior changes over time. Conversely,
            visitors can appear the same if not enough unique information is collected.
          </p>
          <p className={styles.description}>
            Fingerprint overcomes these technical challenges by using state-of-the-art browser identification and
            machine learning techniques.
          </p>
        </section>
        <section className={styles.imageSection}>
          <Card
            icon={<VisitorsSVG />}
            title='Generate unique visitorIDs'
            description='Fingerprint uses browser fingerprinting, cookies, and other technologies including server-side detection techniques. By combining many identification methods, Fingerprint can reach a higher level of accuracy than any other solution.'
          />
          <Card
            icon={<LayersSVG />}
            title='Ensure visitorIDs are stable over time'
            description='Fingerprint uses fuzzy matching and other deduplication techniques. Fingerprint Pro associates new browsing history with the correct visitorID even if some details about the visitor have changed.'
          />
        </section>
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
}
function Card({ icon, title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
