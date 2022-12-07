import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './BadgesSection.module.scss'

import { ReactComponent as FastestSVG } from './FastestSVG.svg'
import { ReactComponent as HighSVG } from './HighSVG.svg'
import { ReactComponent as EasiestSVG } from './EasiestSVG.svg'

import { URL } from '../../../constants/content'

export default function BadgesSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <a
          target='_blank'
          rel='noreferrer'
          href={URL.g2ReviewUrl}
          className={styles.badgesContainer}
          aria-label='g2 review'
        >
          <FastestSVG className={styles.fastestSVG} />
          <HighSVG className={styles.highSVG} />
          <EasiestSVG className={styles.easiestSVG} />
        </a>
      </Container>
    </Section>
  )
}
