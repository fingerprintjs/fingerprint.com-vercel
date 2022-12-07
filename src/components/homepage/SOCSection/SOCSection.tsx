import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as StarsSVG } from './StarsSVG.svg'
import { ReactComponent as AICPASVG } from './AICPASVG.svg'
import { ReactComponent as ClockSVG } from './ClockSVG.svg'

import styles from './SOCSection.module.scss'

export default function SOCSection() {
  return (
    <Section className={styles.root}>
      <Container size='large'>
        <div className={styles.titleContainer}>
          <div className={styles.labelWrapper}>
            <span className={styles.label}>Security and privacy</span>
          </div>
          <h1 className={styles.title}>Your compliance officer will love us, too</h1>
          <p className={styles.description}>We maintain the highest standards in privacy, security and performance.</p>
        </div>
        <div className={styles.cardsContainer}>
          <Card icon={<StarsSVG />} title='GDPR and CCPA Compliant' />
          <Card icon={<ClockSVG />} title='99.9% Uptime SLA' />
          <Card icon={<AICPASVG />} title='SOC 2 Type II Certified' />
        </div>
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
}
function Card({ icon, title }: CardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <div className={styles.cardTitle}>{title}</div>
    </article>
  )
}
