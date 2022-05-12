import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL, PATH } from '../../../constants/content'
import { ReactComponent as FingerprintSVG } from './FingerprintSVG.svg'
import { ReactComponent as ShieldSVG } from './ShieldSVG.svg'

import styles from './PricingSection.module.scss'

export default function PricingSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.titleContainer}>
        <h1 className={styles.title}>Build Versus Buy</h1>
        <p className={styles.description}>
          Whether you are looking to integrate visitor identification with your existing system or want a complete
          end-to-end solution, Fingerprint has an option for your business.
        </p>
      </Container>
      <Container size='large' className={styles.cardsContainer}>
        <Card
          icon={<FingerprintSVG />}
          label='Plans start at $0/Month'
          title='Fingerprint Pro'
          description='Build your own system with our visitor identification API'
          leftTitle='Visitor Identification'
          leftContent='Generates a 99.5% accurate visitorID for each unique device that visits your website. VisitorIDs will need to be mapped to your logins and stored so you can identify shared accounts'
          rightTitle='Additional Visitor Data'
          rightContent='Collect geolocation, browser and device details, and incognito mode detection for every visitor. Access everything through our API or webhooks'
          btnText='Create Free Account'
          btnHref={URL.signupUrl}
          variant='outline'
        />
        <Card
          icon={<ShieldSVG />}
          label='Contact Sales for Custom Pricing'
          title='Account Sharing Prevention'
          description='An all-in-one solution for account sharing prevention'
          leftTitle='Visitor-Login Mapping'
          leftContent='Fully identify shared accounts and assess the extent of sharing within your customer base by mapping our 99.5% accurate visitorIDs to your logins'
          rightTitle='Account Sharing Identification'
          rightContent='Flag accounts that are being shared. Convert account sharing users into paying customers by setting up custom logic and rules that make sense for your business.'
          btnText='Talk to Sales'
          btnHref={PATH.contactSales}
          variant='primary'
        />
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  label: string
  title: string
  description: string
  leftTitle: string
  leftContent: string
  rightTitle: string
  rightContent: string
  btnText: string
  btnHref?: string
  variant: 'primary' | 'outline'
}
function Card({
  icon,
  label,
  title,
  description,
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
  btnHref,
  btnText,
  variant,
}: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <h1 className={styles.label}>{label}</h1>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <section className={styles.contentSection}>
        <div>
          <h3 className={styles.sectionTitle}>{leftTitle}</h3>
          <p className={styles.sectionDescription}>{leftContent}</p>
        </div>
        <div>
          <h3 className={styles.sectionTitle}>{rightTitle}</h3>
          <p className={styles.sectionDescription}>{rightContent}</p>
        </div>
      </section>
      <Button size='big' href={btnHref} variant={variant} className={styles.button}>
        {btnText}
      </Button>
    </div>
  )
}
