import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { repeatElement } from '../../../helpers/repeatElement'

import styles from './LifeAtFingerSection.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Pagination } from 'swiper'
import classNames from 'classnames'
export default function LifeAtFingerSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <h2 className={styles.title}>Life at FingerprintJS</h2>
        <Swiper
          className={styles.swiperWrapper}
          centeredSlides
          modules={[EffectCards, Pagination]}
          effect={'cards'}
          grabCursor
          loop
          loopAdditionalSlides={1}
          pagination
        >
          {repeatElement(6, (i: number) => (
            <SwiperSlide className={classNames('swiper-slide', styles.item)}>
              <img
                key={i}
                alt={'FingerprintJS team'}
                className={classNames(styles.photo, styles[`photo${i + 1}`])}
                src={`/img/members-photos/careers-photo-${i + 1}.png`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Section>
  )
}
