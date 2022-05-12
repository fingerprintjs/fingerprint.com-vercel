import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL, DOC_URL, MAILTO } from '../../../constants/content'

import { ReactComponent as PlaySVG } from './PlaySVG.svg'
import { ReactComponent as ApiWebhooksSVG } from './ApiWebhooksSVG.svg'
import { ReactComponent as DocSVG } from './DocSVG.svg'
import { ReactComponent as TalkSVG } from './TalkSVG.svg'

import styles from './BuiltForEngineersSection.module.scss'

export default function BuiltForEngineersSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.titleContainer}>
        <h1 className={styles.title}>Built for engineers, by engineers</h1>
        <p className={styles.description}>
          Developer teams can easily incorporate Fingerprint into existing workflows or build from scratch with our
          highly accessible documentation and support.
        </p>
      </Container>
      <Container size='large' className={styles.cardsContainer}>
        <Card
          icon={<PlaySVG />}
          title='Start For Free'
          description='Our lightweight Javascript agent can be installed in minutes. Create an account for free with no credit card.'
          linkText='Create Free Account →'
          linkHref={URL.signupUrl}
        />
        <Card
          icon={<ApiWebhooksSVG />}
          title='Webhooks'
          description='Receive instant notifications delivered securely to your backend systems, ideal for building scalable.'
          linkText='View Documentation →'
          linkHref={DOC_URL.webhooksUrl}
        />
        <Card
          icon={<DocSVG />}
          title='Documentation'
          description='Extensive guides make it easy for developer teams to get up to speed with Fingerprint, fast.'
          linkText='Read Quick Start Guide →'
          linkHref={DOC_URL.getStartedUrl}
        />
        <Card
          icon={<TalkSVG />}
          title='Contact Support'
          description='Get in touch via chat and email and get technical help within 1 business day.'
          linkText='Contact Support →'
          linkHref={MAILTO.mailToUrl}
        />
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
  linkText: string
  linkHref: string
}
function Card({ icon, title, description, linkText, linkHref }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
      <a href={linkHref} className={styles.cardLink} target='_blank' rel='noreferrer'>
        {linkText}
      </a>
    </div>
  )
}
