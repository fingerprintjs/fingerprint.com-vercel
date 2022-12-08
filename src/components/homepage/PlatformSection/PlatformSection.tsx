import React, { useRef } from 'react'
import Container from '../../common/Container'
import { repeatElement } from '../../../helpers/repeatElement'

import styles from './PlatformSection.module.scss'

import { ReactComponent as LinePointsSVG } from './LinePointsSVG.svg'
import { ReactComponent as TopLayerSVG } from './TopLayerSVG.svg'
import { ReactComponent as BottomLayerSVG } from './BottomLayerSVG.svg'
import { ReactComponent as DotSVG } from './DotSVG.svg'

import { ReactComponent as TopLayerMobileSVG } from './TopLayerMobileSVG.svg'
import { ReactComponent as BottomLayerMobileSVG } from './BottomLayerMobileSVG.svg'

import { ReactComponent as LeftLineSVG } from './LeftLineSVG.svg'
import { ReactComponent as RightLineSVG } from './RightLineSVG.svg'

import { ReactComponent as DiscSVG } from './DiscSVG.svg'

import { useInView } from 'framer-motion'

import classNames from 'classnames'

export default function PlatformSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <Container className={styles.container} size='large'>
      <header
        className={classNames(styles.header, {
          [styles.visible]: isInView,
        })}
      >
        <div className={styles.labelWrapper} ref={ref}>
          <span className={styles.label}>The platform</span>
        </div>
        <h2 className={styles.title}>Recognize your users across all touchpoints</h2>
        <p className={styles.description}>
          Fingerprint’s device identity platform gives you a complete view of your users across web and mobile - whether
          or not they are logged in or concealing their identity.
        </p>
      </header>

      <div
        className={classNames(styles.platformContainer, {
          [styles.platformVisible]: isInView,
        })}
      >
        <h3 className={styles.platformTitle}>The device identity platform</h3>
        <div className={styles.platformLogo}>
          <TopLayerSVG className={styles.topLayerLogo} />
          <BottomLayerSVG className={styles.bottomLayerLogo} />
          <TopLayerMobileSVG className={styles.topLayerLogoMobile} />
          <BottomLayerMobileSVG className={styles.bottomLayerLogoMobile} />
          <LinePointsSVG className={styles.linePoints} />
          <div className={styles.dots}>
            {repeatElement(13, (i: number) => (
              <DotSVG key={i} className={styles.dotLineIcon} />
            ))}
          </div>

          <span className={styles.yourTrafficLabel}>Your Traffic</span>
          <span className={classNames(styles.dot, styles.integrationsDot)}>
            Integrations
            <span className={styles.dotIconWrapper}>
              <DotSVG className={styles.dotIcon} />
            </span>
          </span>
          <span className={classNames(styles.dot, styles.mobileDot)}>
            Mobile
            <span className={styles.dotIconWrapper}>
              <DotSVG className={styles.dotIcon} />
            </span>
          </span>
          <span className={classNames(styles.dot, styles.webDot)}>
            Web
            <span className={styles.dotIconWrapper}>
              <DotSVG className={styles.dotIcon} />
            </span>
          </span>
        </div>

        <div className={styles.leftSection}>
          <LeftLineSVG className={styles.leftLine} />
          <div className={styles.leftWrapper}>
            <h4 className={styles.sideTitle}>Platform-as-a-service</h4>
            <p className={styles.sideDescription}>Access to highly accurate signals to power your data models.</p>
            <Feature
              title='Fingerprint Pro'
              points={['Browser and device fingerprinting', 'Incognito mode detection', 'Geolocation']}
              position={1}
            />
            <Feature title='Bot Detection' points={['Friendly bots', 'Automation tooling']} position={2} />
          </div>
        </div>
        <div className={styles.rightSection}>
          <RightLineSVG className={styles.rightLine} />
          <div className={styles.rightWrapper}>
            <h4 className={styles.sideTitle}>Software-as-a-service</h4>
            <p className={styles.sideDescription}>
              Out-of-the-box solutions to common use cases, build your own with our code tutorials.
            </p>
            <Feature title='Account Sharing Prevention' position={3} />
            <Feature title='Build your own custom solution' position={4} />
          </div>
        </div>
      </div>
    </Container>
  )
}

interface FeaturesProps {
  title: string
  points?: string[]
  position: number
}
function Feature({ title, points, position }: FeaturesProps) {
  return (
    <div className={classNames(styles.feature, styles[`feature${position}`])}>
      <p className={styles.featureTitle}>{title}</p>
      {points && (
        <ul className={styles.points}>
          {points.map((point, index) => (
            <li className={styles.point} key={`${title}-${index}`}>
              <DiscSVG className={styles.disc} />
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
