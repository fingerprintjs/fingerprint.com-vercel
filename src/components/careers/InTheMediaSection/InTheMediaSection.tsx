import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as VentureSVG } from './logos/VentureSVG.svg'
import { ReactComponent as TheVergeSVG } from './logos/TheVergeSVG.svg'
import { ReactComponent as TechCrunchSVG } from './logos/TechCrunchSVG.svg'
import { ReactComponent as GizmodoSVG } from './logos/GizmodoSVG.svg'
import { ReactComponent as TheRegisterSVG } from './logos/TheRegisterSVG.svg'

import styles from './InTheMediaSection.module.scss'

export default function InTheMediaSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <h2 className={styles.title}>Fingerprint In the Media</h2>
        <div className={styles.logos}>
          <a
            className={styles.link}
            href='https://venturebeat.com/2021/11/03/fraud-prevention-platform-fingerprintjs-lands-32m-to-launch-premium-services/'
            target='_blank'
            rel='noreferrer'
          >
            <VentureSVG className={styles.venture} />
          </a>
          <a
            className={styles.link}
            href='https://www.theverge.com/2022/1/16/22886809/safari-15-bug-leak-browsing-history-personal-information'
            target='_blank'
            rel='noreferrer'
          >
            <TheVergeSVG className={styles.theVerge} />
          </a>
          <a
            className={styles.link}
            href='https://techcrunch.com/2020/10/13/commercializing-the-open-source-fingerprintjs-browser-fingerprinting-tech-nabs-chicago-entrepreneur-4m/'
            target='_blank'
            rel='noreferrer'
          >
            <TechCrunchSVG className={styles.techCrunch} />
          </a>
          <a
            className={styles.link}
            href='https://gizmodo.com/ios-15-3-update-iphone-ipad-safari-security-bug-fix-1848427560'
            target='_blank'
            rel='noreferrer'
          >
            <GizmodoSVG className={styles.gizmodo} />
          </a>
          <a
            className={styles.link}
            href='https://www.theregister.com/2021/05/14/browser_fingerprinting_flaw/'
            target='_blank'
            rel='noreferrer'
          >
            <TheRegisterSVG className={styles.register} />
          </a>
        </div>
      </Container>
    </Section>
  )
}
