import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as SalarySVG } from './logos/SalarySVG.svg'
import { ReactComponent as VacationSVG } from './logos/VacationSVG.svg'
import { ReactComponent as RemoteSVG } from './logos/RemoteSVG.svg'
import { ReactComponent as TechSVG } from './logos/TechSVG.svg'
import { ReactComponent as CultureSVG } from './logos/CultureSVG.svg'
import { ReactComponent as FunSVG } from './logos/FunSVG.svg'
import { ReactComponent as GrowSVG } from './logos/GrowSVG.svg'
import { ReactComponent as PersonalSVG } from './logos/PersonalSVG.svg'

import { ReactComponent as NoBsSVG } from './logos/NoBsSVG.svg'
import { ReactComponent as FailLearnGrowSVG } from './logos/FailLearnGrowSVG.svg'
import { ReactComponent as SeriouslySVG } from './logos/SeriouslySVG.svg'
import { ReactComponent as Level5SVG } from './logos/Level5SVG.svg'

import styles from './WhatWeOfferSection.module.scss'

export default function WhatWeOfferSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.cardsContainer}>
        <h2 className={styles.title}>What we offer</h2>
        <div className={styles.cardsSection}>
          <Card
            icon={<SalarySVG />}
            title='Competitive salary'
            description='We offer competitive salaries and  equity because we believe all employees should own a part of FingerprintJS.'
          />
          <Card
            icon={<VacationSVG />}
            title='Unlimited vacation'
            description='To prioritize work-life balance, we even have a minimum vacation days target to encourage everyone gets the rest they need.'
          />
          <Card
            icon={<RemoteSVG />}
            title='Remote-first'
            description='We work asynchronously and respect time-zone differences. Choose where and when you do your work best!'
          />
          <Card
            icon={<TechSVG />}
            title='Tech'
            description='We hook you up with a brand new Macbook so you can do your best work (you get to keep it after 3 years).'
          />
          <Card
            icon={<CultureSVG />}
            title='Culture'
            description="We're a small team with a lean hierarchy where you can make a real impact in shaping the company culture. Come grow with us!"
          />
          <Card
            icon={<FunSVG />}
            title='Fun'
            description='We do virtual social events as well as in-person meetups. We are planning a team offsite to Mexico for this year!'
          />
          <Card
            icon={<GrowSVG />}
            title='Grow With Us'
            description='We want you to grow with us, so we offer a $600 yearly budget that you can spend to learn new stuff!'
          />
          <Card
            icon={<PersonalSVG />}
            title='Personal development'
            description='We give you the freedom to grow and experiment. Work on open-source projects and try new things and ideas!'
          />
        </div>
      </Container>
    </Section>
  )
}

export function OurValuesSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.cardsContainer}>
        <h2 className={styles.title}>Our Values</h2>
        <div className={styles.cardsSection}>
          <Card
            icon={<NoBsSVG />}
            title='No BS.'
            description='We are open and direct. We say what we mean and we mean what we say.'
          />
          <Card
            icon={<FailLearnGrowSVG />}
            title='Fail. Learn. Grow.'
            description="We aren't afraid to take big bets and make mistakes along the way in order to build a truly successful business."
          />
          <Card
            icon={<SeriouslySVG />}
            title="Don't take yourself too seriously."
            description='Whether playing online games or discussing company strategy, we try to have fun and bring our authentic selves to work.'
          />
          <Card
            icon={<Level5SVG />}
            title='Be level 5 helpful.'
            description='We believe in going the extra mile in helping both our peers and our customers.'
          />
        </div>
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
