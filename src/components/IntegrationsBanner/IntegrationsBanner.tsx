import React from 'react'
import styles from './IntegrationsBanner.module.scss'
import Button from '../common/Button'

export interface IntegrationsBannerProps {
  title: string
  children: React.ReactNode | string
  ctaText: string
  ctaHref: string
  openNewTab: boolean
}

export default function IntegrationsBanner({ title, children, ctaText, ctaHref, openNewTab }: IntegrationsBannerProps) {
  return (
    <section className={styles.banner}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{children}</p>
      <Button href={ctaHref} className={styles.button} size={'big'} openNewTab={openNewTab} variant='blue'>
        {ctaText}
      </Button>
    </section>
  )
}
