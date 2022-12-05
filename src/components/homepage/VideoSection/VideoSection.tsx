import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL } from '../../../constants/content'

import styles from './VideoSection.module.scss'

export default function VideoSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <h2 className={styles.title}>See how Fingerprint works</h2>
        <iframe
          id='overview-video'
          className={styles.iframe}
          width='814'
          src={URL.promotionalVideo}
          title='YouTube video player'
          frameBorder={0}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </Container>
    </Section>
  )
}
