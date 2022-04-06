import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as MissionSVG } from './MissionSVG.svg'
import { ReactComponent as VisionSVG } from './VisionSVG.svg'

import styles from './MissionAndVisionSection.module.scss'

export default function MissionAndVisionSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.cardsContainer}>
        <Card icon={<MissionSVG />} title='Our Mission' description='We empower developers to stop online fraud.' />
        <Card
          icon={<VisionSVG />}
          title='Our Vision'
          description='To create the most developer friendly anti-fraud API solutions.'
        />
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
      <div className={styles.iconWrapper}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <h3 className={styles.cardDescription}>{description}</h3>
    </div>
  )
}
