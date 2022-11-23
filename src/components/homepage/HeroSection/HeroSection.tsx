import React, { useRef, useEffect } from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { PATH, URL } from '../../../constants/content'

import { ReactComponent as TickSVG } from './TickSVG.svg'
import heroWebm from '../../../assets/hero.webm'
import heroMp4 from '../../../assets/hero.mp4'

import { useInView } from 'framer-motion'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  const ref = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.play()
    }
  }, [isInView])

  return (
    <Container className={styles.container} size='large'>
      <section className={styles.heroSection}>
        <h1 className={styles.title}>The device identity platform for high-scale applications</h1>
        <p className={styles.description}>
          Powered by the most accurate device fingerprinting technology, Fingerprint enables engineers to prevent fraud,
          improve user experiences, and better understand their traffic.
        </p>
        <div className={styles.buttons}>
          <Button href={URL.signupUrl} variant='orangeGradient' className={styles.button}>
            Create Free Account
          </Button>
          <Button href={PATH.demoUrl} variant='orangeGradientOutline'>
            View Live Demo
          </Button>
        </div>
        <div className={styles.tips}>
          <BottomTip>Free for developers</BottomTip>
          <BottomTip>GDRP/CCPA Compliant</BottomTip>
          <BottomTip>Get Started in 10 minutes</BottomTip>
        </div>
      </section>
      <video muted playsInline ref={ref} className={styles.videoSection}>
        <source src={heroWebm} type='video/webm' />
        <source src={heroMp4} type='video/mp4' />
      </video>
    </Container>
  )
}

interface BottomTipProps {
  children: string
}
function BottomTip({ children }: BottomTipProps) {
  return (
    <span className={styles.bottomTip}>
      <TickSVG />
      {children}
    </span>
  )
}
