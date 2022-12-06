import React, { useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL } from '../../../constants/content'

import styles from './VideoSection.module.scss'
import useIntersectionObserver from '../../../hooks/useIntersectionObserver'

export default function VideoSection() {
  const ref = useRef<HTMLHeadingElement | null>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <h2 ref={ref} className={styles.title}>
          See how Fingerprint works
        </h2>
        {isVisible && (
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
        )}
      </Container>
    </Section>
  )
}
