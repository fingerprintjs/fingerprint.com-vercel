import React, { useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './UseCasesSection.module.scss'

import { ReactComponent as PreventFraud1 } from './PreventFraud1SVG.svg'
import { ReactComponent as PreventFraud2 } from './PreventFraud2SVG.svg'
import { ReactComponent as PreventFraud3 } from './PreventFraud3SVG.svg'

import { ReactComponent as ImproveUser1 } from './ImproveUser1SVG.svg'
import { ReactComponent as ImproveUser2 } from './ImproveUser2SVG.svg'
import { ReactComponent as ImproveUser3 } from './ImproveUser3SVG.svg'

import { ReactComponent as Traffic1 } from './Traffic1SVG.svg'
import { ReactComponent as Traffic2 } from './Traffic2SVG.svg'
import { ReactComponent as Traffic3 } from './Traffic3SVG.svg'

import { useInView } from 'framer-motion'
import classNames from 'classnames'

export default function UseCasesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <div className={styles.labelWrapper}>
          <span className={styles.label}>Use cases</span>
        </div>
        <h2 className={styles.title}>Solve big problems with device identity</h2>
        <p className={styles.description}>
          Fingerprint enables engineering, fraud, and product teams to quickly solve their toughest challenges within
          security, analytics and UI/UX.
        </p>
        <div ref={ref} className={styles.cards}>
          <Card
            icon={<PreventFraudSVG isInView={isInView} />}
            title='Prevent Fraud'
            description='Get access to highly accurate signals to power your data models.'
          />
          <Card
            icon={<ImproveUserSVG isInView={isInView} />}
            title='Improve User Experiences'
            description='Increase revenue and conversions through seamless user experiences.'
          />
          <Card
            icon={<TrafficSVG isInView={isInView} />}
            title='Understand Your Traffic'
            description='Uncover learnings about your users by recognizing every visitor across mobile and web.'
          />
        </div>
      </Container>
    </Section>
  )
}
interface IconProps {
  isInView: boolean
}
function PreventFraudSVG({ isInView }: IconProps) {
  return (
    <div className={styles.preventFraud}>
      <PreventFraud1
        className={classNames(styles.layer1, {
          [styles.visible]: isInView,
        })}
      />
      <PreventFraud2
        className={classNames(styles.layer2, {
          [styles.visible]: isInView,
        })}
      />
      <PreventFraud3
        className={classNames(styles.layer3, {
          [styles.visible]: isInView,
        })}
      />
    </div>
  )
}
function ImproveUserSVG({ isInView }: IconProps) {
  return (
    <div className={styles.improveUser}>
      <ImproveUser1
        className={classNames(styles.layer1, {
          [styles.visible]: isInView,
        })}
      />
      <ImproveUser2
        className={classNames(styles.layer2, {
          [styles.visible]: isInView,
        })}
      />
      <ImproveUser3
        className={classNames(styles.layer3, {
          [styles.visible]: isInView,
        })}
      />
    </div>
  )
}
function TrafficSVG({ isInView }: IconProps) {
  return (
    <div className={styles.traffic}>
      <Traffic1
        className={classNames(styles.layer1, {
          [styles.visible]: isInView,
        })}
      />
      <Traffic2
        className={classNames(styles.layer2, {
          [styles.visible]: isInView,
        })}
      />
      <Traffic3
        className={classNames(styles.layer3, {
          [styles.visible]: isInView,
        })}
      />
    </div>
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
