import React, { useRef } from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { VisitorResponse } from '../../../../types/visitorResponse'

import Skeleton from '../../../Skeleton/Skeleton'
import { getVisitTitle } from '../../../../helpers/fpjs-widget'
import { StaticImage } from 'gatsby-plugin-image'
import { repeatElement } from '../../../../helpers/repeatElement'

import { ReactComponent as IncognitoSVG } from './IncognitoSVG.svg'

import styles from './VisitsSection.module.scss'
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver'

interface VisitsSectionProps {
  isLoading?: boolean
  currentVisit?: VisitorResponse
  visits?: VisitorResponse[]
}
export default function VisitsSection({ isLoading, currentVisit, visits }: VisitsSectionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting

  const loadedCard = (
    <>
      <div className={classNames(styles.visitsCard, { [styles.incognitoCard]: currentVisit?.incognito })}>
        <table className={styles.visitsTable}>
          <tbody>
            <tr className={styles.tableHeader}>
              <th>Time of visit</th>
              <th>incognito mode</th>
            </tr>
            {visits &&
              visits.slice(0, 6).map(({ requestId, timestamp, incognito }, i) => {
                return (
                  <tr
                    className={classNames({ [styles.selected]: currentVisit?.requestId === requestId })}
                    id={`visit_${requestId}`}
                    key={requestId}
                  >
                    <td>{i === 0 ? 'Current visit' : getVisitTitle(timestamp)}</td>
                    <td className={classNames({ [styles.incognito]: incognito })}>{incognito ? 'Yes' : 'No'}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div className={styles.incognito}>
        <IncognitoSVG className={styles.icon} />
        <div className={styles.rows}>
          {currentVisit?.incognito ? (
            <h3 className={styles.title}>you are in private browsing</h3>
          ) : (
            <>
              <h3 className={styles.title}>Not in private browsing</h3>
              <p className={styles.description}>Try revisiting in incognito mode</p>
            </>
          )}
        </div>
      </div>
    </>
  )

  const loadingCard = (
    <>
      <div className={styles.visitsCard}>
        <table className={styles.visitsTable}>
          <tbody>
            <tr className={styles.tableHeader}>
              <th>Time of visit</th>
              <th>incognito mode</th>
            </tr>
            <tr className={styles.selected}>
              <td>Current visit</td>
              <td>
                <Skeleton className={styles.visitSkeleton} width={24} />
              </td>
            </tr>
            {repeatElement(5, (i) => (
              <tr key={i}>
                <td>
                  <Skeleton className={styles.visitSkeleton} width={104} />
                </td>
                <td>
                  <Skeleton className={styles.visitSkeleton} width={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.incognito}>
        <IncognitoSVG className={styles.icon} />
        <div className={styles.rows}>
          <Skeleton width={202} height={20} />
          <Skeleton width={245} height={24} />
        </div>
      </div>
    </>
  )
  return (
    <Section className={styles.visitSection}>
      <Container className={styles.containerVisits} size='large'>
        <section className={classNames(styles.visitsSection, { [styles.visible]: isVisible })}>
          {isLoading ? loadingCard : loadedCard}
        </section>
        <section ref={ref} className={classNames(styles.cardSection, { [styles.visible]: isVisible })}>
          <Card
            icon={<StaticImage src='../../../../img/IncognitoLayers.png' alt='Incognito Card' />}
            title='Incognito Mode Detection'
            description='Your VisitorID remains constant even if you revisit the page in incognito mode or turn on a VPN. '
          />
        </section>
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
      <span className={styles.icon}>{icon}</span>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
