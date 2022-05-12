import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { repeatElement } from '../../../helpers/repeatElement'

import { ReactComponent as ArrowLeftSVG } from './ArrowLeftSVG.svg'
import { ReactComponent as ArrowRightSVG } from './ArrowRightSVG.svg'

import styles from './LifeAtFingerSection.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay, Keyboard, Navigation } from 'swiper'
import classNames from 'classnames'

export default function LifeAtFingerSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <h2 className={styles.title}>Life at Fingerprint</h2>
        <div className={styles.swiperSection}>
          <div className={classNames('btn-prev', styles.buttonLeft)}>
            <span className={styles.arrowWrapper}>
              <ArrowLeftSVG className={styles.arrow} />
            </span>
          </div>
          <Swiper
            className={styles.swiperWrapper}
            modules={[EffectCoverflow, Pagination, Autoplay, Keyboard, Navigation]}
            speed={1000}
            effect={'coverflow'}
            centeredSlides={true}
            slidesPerView={2.9}
            loop
            loopAdditionalSlides={1}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                autoplay: false,
                coverflowEffect: { rotate: 0, stretch: 16, depth: 100, modifier: 3, slideShadows: false },
              },
              420: {
                coverflowEffect: { rotate: 0, stretch: 23, depth: 100, modifier: 3, slideShadows: false },
              },
              640: {
                coverflowEffect: { rotate: 0, stretch: 36, depth: 100, modifier: 3, slideShadows: false },
              },
              1024: {
                autoplay: {
                  delay: 10000,
                },
                coverflowEffect: { rotate: 0, stretch: 49, depth: 100, modifier: 3, slideShadows: false },
              },
            }}
            slideToClickedSlide
            keyboard
            navigation={{
              nextEl: '.btn-next',
              prevEl: '.btn-prev',
            }}
            autoplay
          >
            {repeatElement(6, (i: number) => (
              <SwiperSlide className={classNames('swiper-slide', styles.item)}>
                <img
                  key={i}
                  alt={'Fingerprint team'}
                  className={styles.photo}
                  src={`/img/members-photos/Team${i + 1}.png`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={classNames('btn-next', styles.buttonRight)}>
            <span className={styles.arrowWrapper}>
              <ArrowRightSVG className={styles.arrow} />
            </span>
          </div>
        </div>
      </Container>
    </Section>
  )
}
