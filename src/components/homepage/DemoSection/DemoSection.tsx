import React, { useState, useEffect, useRef } from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { getConfig } from '../../../helpers/fpjs'
import { VisitorResponse } from '../../../types/visitorResponse'
import { loadFpjsHistory } from '../../../helpers/api'
import { getErrorMessage } from '../../../helpers/error'
import { pluralize } from '../../../helpers/case'
import { getVisitTitle } from '../../../helpers/fpjs-widget'
import Skeleton from '../../Skeleton/Skeleton'
import { StaticImage } from 'gatsby-plugin-image'
import Container from '../../common/Container'
import useRollbar from '../../../hooks/useRollbar'
import { BASE_URL } from '../../../constants/content'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Lazy } from 'swiper'
import { Swiper as SwiperCore } from 'swiper/types'
import Tippy from '@tippyjs/react'
import { ReactComponent as InfoSvg } from './InfoSVG.svg'
import { repeatElement } from '../../../helpers/repeatElement'

import { MAPBOX_ACCESS_TOKEN } from '../../../constants/env'
import classNames from 'classnames'

import { ReactComponent as ChevronRightSvg } from './ChevronRightSVG.svg'
import { ReactComponent as ChevronLeftSvg } from './ChevronLeftSVG.svg'
import { ReactComponent as WarningSVG } from './WarningSVG.svg'

import styles from './DemoSection.module.scss'

export default function DemoSection() {
  const { getData, error: identificationError } = useVisitorData(getConfig, { immediate: false })
  const [historyLoadError, setHistoryLoadError] = useState(false)
  const hasError = identificationError != null || historyLoadError
  const [visitorId, setVisitorId] = useState<string>()
  const [visits, setVisits] = useState<VisitorResponse[]>()
  const [visitedTimes, setVisitedTimes] = useState<number>()
  const [incognitoSessions, setIncognitoSessions] = useState<number>()
  const [ips, setIps] = useState<number>()
  const [locations, setLocations] = useState<number>()
  const [activeIndexSlide, setActiveIndexSlide] = useState(0)
  const [swiperInit, setSwiperInit] = useState(false)

  const swiperRef = useRef<SwiperCore>()

  const rollbar = useRollbar()

  useEffect(() => {
    let isCancelled = false

    async function fetchVisits() {
      if (!visitorId) {
        const data = await getData({ ignoreCache: true })
        setVisitorId(data?.visitorId)
      }
      if (!visitorId) {
        return
      }
      try {
        const { visits } = await loadFpjsHistory(visitorId)

        if (!isCancelled) {
          const homepageVisits = visits.filter((visit) => visit.url.startsWith(BASE_URL))
          const homepageIncognito = homepageVisits.filter((visit) => visit.incognito === true)
          const homepageIps = Array.from(new Set(homepageVisits.map((visit) => visit.ip)))
          const homepageLocations = Array.from(new Set(homepageVisits.map((visit) => visit.ipLocation.postalCode)))

          const reversedVisits = homepageVisits.slice().reverse() // to reverse the slider

          setVisits(reversedVisits)
          setVisitedTimes(homepageVisits.length)
          setIncognitoSessions(homepageIncognito.length)
          setIps(homepageIps.length)
          setLocations(homepageLocations.length)

          swiperRef.current?.updateProgress()
          swiperRef.current?.lazy.load()
        }
      } catch (e) {
        setHistoryLoadError(true)
        rollbar.error('Unable to load visits', getErrorMessage(e))
      }
    }
    fetchVisits()

    return () => {
      isCancelled = true
    }
  }, [getData, visitorId, rollbar])

  return (
    <Container className={styles.container}>
      <header className={styles.header}>
        <div className={styles.labelWrapper}>
          <span className={styles.label}>Live demo</span>
        </div>
        <h2 className={styles.title}>See Fingerprint in Action</h2>
      </header>

      <section className={styles.demoSection}>
        {hasError && (
          <div className={styles.errorMessage}>
            <WarningSVG className={styles.warningIcon} />
            <h2 className={styles.tryMessage}>An error occurred.</h2>
            <h2 className={styles.tryMessage}>Please refresh the page or try in incognito mode.</h2>
          </div>
        )}
        <noscript className={styles.errorMessage}>
          <WarningSVG className={styles.warningIcon} />
          <h1 className={styles.tryMessage}>Enable JS to run the demo</h1>
        </noscript>
        <div className={styles.summary}>
          <div className={styles.visitorIdSection}>
            <span className={styles.title}>
              Your visitor id
              <Tippy maxWidth={270} content={'Your unique device identifier.'} theme='grey'>
                <InfoSvg tabIndex={0} />
              </Tippy>
            </span>

            {visitorId ? (
              <span className={styles.visitorId}>{visitorId}</span>
            ) : (
              <Skeleton className={styles.visitorIdSkeleton} />
            )}
          </div>
          <div className={styles.visitSummarySection}>
            <div className={styles.visitSummaryTitle}>
              <span className={styles.title}>your visit summary</span>
              {visitedTimes !== undefined ? (
                <span className={styles.times}>
                  You visited {visitedTimes > 20 ? '20+ times' : pluralize(visitedTimes, 'time')}
                </span>
              ) : (
                <Skeleton className={styles.visitedTimesSkeleton} />
              )}
            </div>
            <ul className={styles.visitSummary}>
              <li className={styles.summaryInfo}>
                <span className={styles.title}>
                  incognito
                  <Tippy
                    maxWidth={270}
                    content={'Fingerprint Pro analyzes every page view and detects if it was made in incognito mode.'}
                    theme='grey'
                  >
                    <InfoSvg tabIndex={0} />
                  </Tippy>
                </span>
                {incognitoSessions !== undefined ? (
                  <span className={styles.value}>{pluralize(incognitoSessions, 'session')}</span>
                ) : (
                  <Skeleton className={styles.incognitoTimesSkeleton} />
                )}
              </li>
              <li className={styles.separator} aria-hidden='true' role='presentation' />
              <li className={styles.summaryInfo}>
                <span className={styles.title}>IP address</span>
                {ips !== undefined ? (
                  <span className={styles.value}>{pluralize(ips, 'IP')}</span>
                ) : (
                  <Skeleton className={styles.ipTimesSkeleton} />
                )}
              </li>
              <li className={styles.separator} aria-hidden='true' role='presentation' />
              <li className={styles.summaryInfo}>
                <span className={styles.title}>
                  geolocation
                  <Tippy maxWidth={270} content={'Based on the visit IP address.'} theme='grey'>
                    <InfoSvg tabIndex={0} />
                  </Tippy>
                </span>
                {locations !== undefined ? (
                  <span className={styles.value}>{pluralize(locations, 'location')}</span>
                ) : (
                  <Skeleton className={styles.locationTimesSkeleton} />
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.visitHistory}>
          <h3 className={styles.title}>Your visit history</h3>
          <Swiper
            modules={[Lazy]}
            spaceBetween={8}
            slidesPerView={1.1}
            watchSlidesProgress
            centeredSlides
            lazy
            preloadImages={false}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
              setSwiperInit(true)
            }}
            initialSlide={21}
            onSlideChange={(swiper) => setActiveIndexSlide(swiper.activeIndex)}
            breakpoints={{
              645: {
                spaceBetween: 32,
                slidesPerView: 'auto',
              },
              1024: {
                spaceBetween: 116,
                slidesPerView: 'auto',
              },
            }}
          >
            {visits
              ? visits.map((visit) => {
                  const isLocationAvailable =
                    visit?.ipLocation?.latitude && visit?.ipLocation?.longitude && visit?.ipLocation?.country?.code

                  return (
                    <SwiperSlide
                      className={classNames(styles.swiperSlide, {
                        [styles.activeSlide]:
                          visit.requestId === (visits[activeIndexSlide] && visits[activeIndexSlide].requestId),
                      })}
                      key={visit.timestamp}
                    >
                      <div className={classNames(styles.visit, { [styles.incognito]: visit.incognito })}>
                        <div className={styles.leftColumn}>
                          <div className={styles.visitIp}>
                            <span className={styles.field}>Ip</span>
                            <span className={styles.value}>{visit.ip}</span>
                          </div>
                          <span className={styles.separator} />
                          <div className={styles.visitIncognito}>
                            <span className={styles.field}>incognito</span>
                            <span className={styles.value}>{visit.incognito ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                        <div className={styles.visitLocation}>
                          {isLocationAvailable ? (
                            <>
                              <div className={styles.location}>
                                <span className={styles.field}>location</span>
                                <span className={styles.valueLocation}>
                                  {visit.ipLocation?.city?.name ? `${visit.ipLocation?.city?.name}, ` : ''}
                                  {visit.ipLocation?.country?.name}
                                </span>
                              </div>
                              <div className={styles.mapWrapper}>
                                <Skeleton className={classNames('swiper-lazy-preloader', styles.mapSkeleton)} />
                                <img
                                  alt='Location map'
                                  data-src={`https://api.mapbox.com/styles/v1/mapbox/${
                                    visit.incognito ? 'dark-v10' : 'outdoors-v11'
                                  }/static/${visit.ipLocation?.longitude},${
                                    visit?.ipLocation?.latitude
                                  },7.00,0/350x200?access_token=${MAPBOX_ACCESS_TOKEN}`}
                                  className={classNames('swiper-lazy', styles.mapImage)}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={styles.location}>
                                <span className={styles.field}>location</span>
                                <span className={styles.value}>Unknown</span>
                              </div>
                              <div className={styles.mapWrapperUnk}>
                                <StaticImage
                                  placeholder='blurred'
                                  layout='fullWidth'
                                  src='./unk.png'
                                  alt='Location Unknown'
                                  className={styles.mapImage}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className={styles.buttons}>
                        <div onClick={() => swiperRef.current?.slidePrev()} className={styles.buttonLeft}>
                          <ChevronLeftSvg
                            className={classNames(styles.arrow, {
                              [styles.firstArrow]: visit.requestId === visits[0].requestId,
                            })}
                          />
                        </div>
                        <h3 className={styles.navigationTitle}>
                          {visit.requestId === visits[visits.length - 1].requestId
                            ? 'Current Visit'
                            : getVisitTitle(visit.timestamp)}
                        </h3>

                        <div onClick={() => swiperRef.current?.slideNext()} className={styles.buttonRight}>
                          <ChevronRightSvg
                            className={classNames(styles.arrow, {
                              [styles.lastArrow]: visit.requestId === visits[visits.length - 1].requestId,
                            })}
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })
              : repeatElement(21, (i: number) => (
                  <SwiperSlide key={i} className={styles.swiperSlideSkeleton}>
                    <div
                      className={classNames(styles.skeletonWrapper, {
                        [styles.swiperNotActive]: !swiperInit,
                      })}
                    >
                      <Skeleton className={styles.visitSkeleton} />
                      <div className={styles.buttons}>
                        <div onClick={() => swiperRef.current?.slidePrev()} className={styles.buttonLeft}>
                          <ChevronLeftSvg className={styles.arrow} />
                        </div>
                        <Skeleton className={styles.navigationSkeleton} />
                        <div onClick={() => swiperRef.current?.slideNext()} className={styles.buttonRight}>
                          <ChevronRightSvg className={styles.arrow} />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </section>
    </Container>
  )
}
