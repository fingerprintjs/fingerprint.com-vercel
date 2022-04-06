import React from 'react'
import classNames from 'classnames'
import styles from './HeroWithCTA.module.scss'
import Section from '../common/Section'
import Container from '../common/Container'

import Button from '../common/Button'

export interface HeroWithCTAProps {
  title: string
  children: React.ReactNode
  className?: string
  ctaText: string
  ctaHref: string
  variant?: 'primary' | 'secondary'
  buttonVariant?: 'primary' | 'outline' | 'clear' | 'faded'
  openNewTab?: boolean
}

export default function HeroWithCTA({
  title,
  children,
  className,
  ctaText,
  ctaHref,
  variant = 'primary',
  buttonVariant,
  openNewTab,
}: HeroWithCTAProps) {
  return (
    <Section className={classNames(styles.root, className)}>
      <Container size='small' className={styles.heroContainer}>
        <h1 className={classNames(styles.title, { [styles.secondaryTitle]: variant === 'secondary' })}>{title}</h1>
        <p className={classNames(styles.description, { [styles.secondaryDescription]: variant === 'secondary' })}>
          {children}
        </p>
        <Button
          size='big'
          href={ctaHref}
          variant={buttonVariant}
          className={classNames(styles.button, { [styles.secondaryButton]: variant === 'secondary' })}
          openNewTab={openNewTab}
        >
          {ctaText}
        </Button>
      </Container>
    </Section>
  )
}
