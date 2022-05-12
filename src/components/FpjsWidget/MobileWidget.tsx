import React from 'react'
import { ReactComponent as ChevronRightSvg } from '../../img/chevron-right.svg'
import { ReactComponent as ChevronLeftSvg } from '../../img/chevron-left.svg'
import { Swiper, SwiperSlide } from '../../../node_modules/swiper/react/swiper-react' //using this way to import swiper to fix issue with Jest https://github.com/nolimits4web/swiper/issues/4871
import { Lazy, Navigation, Pagination } from 'swiper'

import classNames from 'classnames'
import Button from '../common/Button'
import { CurrentVisitProps } from '../../types/currentVisitProps'
import { getBotDecision, getBrowserName, getVisitTitle } from '../../helpers/fpjs-widget'
import { ReactComponent as InfoSvg } from '../../img/info.svg'
import Tippy from '@tippyjs/react'
import styles from './MobileWidget.module.scss'
import { MAPBOX_ACCESS_TOKEN } from '../../constants/env'
import Skeleton from '../Skeleton/Skeleton'
import { repeatElement } from '../../helpers/repeatElement'

interface MobileWidgetProps extends CurrentVisitProps {
  isLoaded: boolean
  className?: string | string[]
}

export default function MobileWidget({ className, isLoaded, visits, visitorId }: MobileWidgetProps) {
  return (
    <Swiper
      modules={[Lazy, Navigation, Pagination]}
      className={classNames(className, styles.container, {
        [styles.loaded]: isLoaded,
      })}
      lazy={true}
      slidesPerView={1.05}
      spaceBetween={10}
      centeredSlides={true}
      pagination={{
        dynamicBullets: true,
        el: '.swiper-pagination',
        clickable: true,
      }}
      navigation={{
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
      }}
    >
      {visits &&
        visits.map((visit) => {
          return (
            <SwiperSlide
              key={visit.timestamp}
              className={classNames('swiper-slide', styles.item, { [styles.incognito]: visit.incognito })}
            >
              <header className={styles.header}>
                <Button
                  label='Previous'
                  className={classNames('btn-prev', styles.button, styles.mobileOnly)}
                  variant='clear'
                >
                  <ChevronLeftSvg />
                </Button>
                <h3 className={styles.title}>
                  {visit.requestId === visits[0].requestId ? 'Current Visit' : getVisitTitle(visit.timestamp)}
                </h3>
                <Button
                  label='Next'
                  className={classNames('btn-next', styles.button, styles.mobileOnly)}
                  variant='clear'
                >
                  <ChevronRightSvg />
                </Button>
              </header>
              <div className={styles.visit}>
                <div className={styles.visitId}>
                  <div className={styles.label}>Your ID</div>
                  <div className={styles.value}>
                    {visitorId}{' '}
                    <Tippy content='Every visitor to your website is assigned a unique & permanent identifier.'>
                      <InfoSvg tabIndex={0} />
                    </Tippy>
                  </div>
                </div>
                <div className={styles.bot}>
                  <div className={styles.label}>Headless Browser</div>
                  <div className={styles.value}>
                    {getBotDecision(visit.bot?.probability ?? visit.browserDetails?.botProbability ?? 0)}{' '}
                  </div>
                </div>
                <div className={styles.ip}>
                  <div className={styles.label}>IP</div>
                  <div className={styles.value}>{visit.ip}</div>
                </div>
                <div className={styles.incognito}>
                  <div className={styles.label}>Incognito</div>
                  <div className={styles.value}>
                    {visit.incognito ? 'Yes' : 'No'}{' '}
                    <Tippy content='Fingerprint Pro analyzes every page view and detects if it was made in incognito mode. Open this page in private mode to see it in action.'>
                      <InfoSvg tabIndex={0} />
                    </Tippy>
                  </div>
                </div>
                <div className={styles.browser}>
                  <div className={styles.label}>Browser</div>
                  <div className={styles.value}>{visit && getBrowserName(visit.browserDetails || visit)}</div>
                </div>
                <div className={styles.location}>
                  <div className={styles.label}>Location</div>
                  <div
                    className={classNames(styles.value, {
                      [styles.unavailable]: visit?.ipLocation?.latitude && visit?.ipLocation?.longitude,
                    })}
                  >
                    {visit && (
                      <>
                        <Skeleton square className='swiper-lazy-preloader' />
                        <img
                          alt='Location map'
                          data-src={`https://api.mapbox.com/styles/v1/mapbox/${
                            visit.incognito ? 'dark-v10' : 'outdoors-v11'
                          }/static/${visit.ipLocation?.longitude},${
                            visit?.ipLocation?.latitude
                          },7.00,0/512x512?access_token=${MAPBOX_ACCESS_TOKEN}`}
                          className='swiper-lazy'
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      <div className='swiper-pagination' />
    </Swiper>
  )
}

export function MobileLoadingState() {
  return (
    <Swiper
      modules={[Lazy, Navigation]}
      className={classNames(styles.container)}
      slidesPerView={1.05}
      spaceBetween={10}
      centeredSlides={true}
    >
      <SwiperSlide className={classNames('swiper-slide', styles.item)}>
        <header className={styles.header}>
          <Button label='Previous' className={classNames('btn-prev', styles.button, styles.mobileOnly)} variant='clear'>
            <ChevronLeftSvg />
          </Button>
          <Skeleton width={125} height={22} className={styles.headerLoading} />
          <Button label='Next' className={classNames('btn-next', styles.button, styles.mobileOnly)} variant='clear'>
            <ChevronRightSvg />
          </Button>
        </header>
        <div className={styles.visit}>
          <div className={styles.visitId}>
            <div className={styles.label}>
              <Skeleton width={75} height={21} />
            </div>
            <div className={styles.value}>
              <Skeleton width={200} height={24} />
            </div>
          </div>
          {repeatElement(4, (i) => (
            <div key={i} className={styles.loadingSection}>
              <div className={styles.label}>
                <Skeleton width={110} height={21} />
              </div>
              <div className={styles.value}>
                <Skeleton width={110} height={21} />
              </div>
            </div>
          ))}
          <div className={styles.location}>
            <div className={styles.label}>
              <Skeleton width={75} height={21} />
            </div>
            <div className={styles.value}>
              <Skeleton square />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
