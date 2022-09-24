import React from 'react'
import FpjsWidget from '../FpjsWidget'
import GetStartedForm from '../GetStartedForm'
import Container from '../common/Container'
import Section from '../common/Section'
import { ReactComponent as InfoSvg } from '../../img/info.svg'
import Tippy from '@tippyjs/react'
import { Link } from 'gatsby'
import { isBrowser } from '../../helpers/detector'
import styles from './LiveDemoSection.module.scss'

export default function LiveDemoSection() {
  return (
    <Section className={styles.liveSection}>
      <Container size='large' className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>The highest accuracy device identification for mobile and web</h1>
          <p className={styles.description}>
            Stop fraud, spam, and account takeover with
            <em>
              {' '}
              99.5% accurate
              <Tippy
                interactive
                delay={250}
                maxWidth={270}
                appendTo={isBrowser() ? document.body : undefined} // to prevent the tooltip from taking space from the description
                content={
                  <>
                    Leading competitors offer 40-60% accuracy.{' '}
                    <Link className={styles.tipLink} to='/blog/device-fingerprinting-accuracy/'>
                      Why this matters &gt;
                    </Link>
                  </>
                }
              >
                <InfoSvg tabIndex={0} />
              </Tippy>{' '}
            </em>
            device fingerprinting as a service.
          </p>
          <GetStartedForm className={styles.form} />
        </header>
        <div className={styles.content}>
          <FpjsWidget />
        </div>
      </Container>
    </Section>
  )
}
