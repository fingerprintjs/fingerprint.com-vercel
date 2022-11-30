import React, { useState } from 'react'

import Container from '../../common/Container'

import styles from './ForDevelopersSection.module.scss'
import classNames from 'classnames'
import { Link } from 'gatsby'
import { PATH, DOC_URL } from '../../../constants/content'
import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'

import { AnimatePresence, motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'

import { StaticImage } from 'gatsby-plugin-image'

import { ReactComponent as SdkMobileSVG } from './img/SdkMobileSVG.svg'
import { ReactComponent as CdnMobileSVG } from './img/CdnMobileSVG.svg'
import { ReactComponent as ApiMobileSVG } from './img/ApiMobileSVG.svg'

enum tabOptions {
  ApiAndWebhooks,
  CDN,
  SDKs,
}
export default function ForDevelopersSection() {
  const [currentTab, setCurrentTab] = useState(tabOptions.SDKs)

  const cards = {
    api: {
      title: 'API and Webhooks',
      description: 'Access visitor history at lightspeed. Receive notifications delivered securely to your backend.',
      link: DOC_URL.documentationUrl,
      linkText: 'Explore Documentation',
      icon: (
        <StaticImage src='./img/Api.png' alt='Api card' height={278} placeholder='none' backgroundColor='transparent' />
      ),
      openNewTab: true,
      onMouseOver: (e) => {
        e.preventDefault()
        setCurrentTab(tabOptions.ApiAndWebhooks)
      },
      isSelected: currentTab === tabOptions.ApiAndWebhooks,

      iconTablet: (
        <StaticImage
          src='./img/ApiMobile.png'
          alt='Api card'
          height={200}
          placeholder='none'
          backgroundColor='transparent'
        />
      ),
      iconMobile: ApiMobileSVG,
    },
    cdn: {
      title: 'CDN Integrations',
      description: 'Our Cloudflare integration makes it easy to use Fingerprint at scale.',
      link: PATH.integrations,
      linkText: 'Explore Integrations',
      icon: (
        <StaticImage src='./img/Cdn.png' alt='Cdn card' height={278} placeholder='none' backgroundColor='transparent' />
      ),
      openNewTab: false,
      onMouseOver: (e) => {
        e.preventDefault()
        setCurrentTab(tabOptions.CDN)
      },
      isSelected: currentTab === tabOptions.CDN,

      iconTablet: (
        <StaticImage
          src='./img/CdnMobile.png'
          alt='Cdn card'
          height={200}
          placeholder='none'
          backgroundColor='transparent'
        />
      ),
      iconMobile: CdnMobileSVG,
    },
    sdk: {
      title: 'SDKs and Libraries',
      description: 'Over 10 SDKs for the most popular languages and frameworks.',
      link: PATH.sdks,
      linkText: 'Explore SDKs',
      icon: (
        <StaticImage src='./img/Sdk.png' alt='Sdk card' height={278} placeholder='none' backgroundColor='transparent' />
      ),
      openNewTab: false,
      onMouseOver: (e) => {
        e.preventDefault()
        setCurrentTab(tabOptions.SDKs)
      },
      isSelected: currentTab === tabOptions.SDKs,

      iconTablet: (
        <StaticImage src='./img/Sdk.png' alt='Sdk card' height={250} placeholder='none' backgroundColor='transparent' />
      ),
      iconMobile: SdkMobileSVG,
    },
  }
  return (
    <>
      <Container size='large' className={styles.container}>
        <header className={styles.header}>
          <div className={styles.labelWrapper}>
            <span className={styles.label}>For developers</span>
          </div>
          <h2 className={styles.title}>Fingerprint is easy to implement</h2>
          <p className={styles.description}>
            Developer teams can get started quickly with our intuitive APIs and extensive documentation.
          </p>
        </header>
        <div className={styles.cards}>
          {Object.entries(cards).map(([key, value], index) => (
            <React.Fragment key={`desktop-${key}-${index}`}>
              <Card
                title={value.title}
                description={value.description}
                link={value.link}
                linkText={value.linkText}
                icon={value.icon}
                openNewTab={value.openNewTab}
                onMouseOver={value.onMouseOver}
                isSelected={value.isSelected}
                iconTablet={value.iconTablet}
              />
            </React.Fragment>
          ))}
        </div>
      </Container>
      <div className={styles.cardsMobile}>
        <Swiper spaceBetween={8} slidesPerView={1.1} slidesOffsetBefore={20} slidesOffsetAfter={20}>
          {Object.entries(cards)
            .reverse()
            .map(([key, value], index) => (
              <React.Fragment key={`mobile-slider-${key}-${index}`}>
                <SwiperSlide className='swiper-slide' key={value.title}>
                  <MobileCard
                    title={value.title}
                    description={value.description}
                    link={value.link}
                    linkText={value.linkText}
                    openNewTab={value.openNewTab}
                    iconMobile={value.iconMobile}
                  />
                </SwiperSlide>
              </React.Fragment>
            ))}
        </Swiper>
      </div>
    </>
  )
}

interface CardMobileProps {
  title: string
  description: string
  icon?: React.ReactNode
  iconMobile?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  link: string
  linkText: string
  openNewTab: boolean
}

interface CardProps extends CardMobileProps {
  onMouseOver: (e: React.MouseEvent<HTMLDivElement>) => void
  isSelected: boolean
  iconTablet: React.ReactNode
}
function Card({
  title,
  description,
  link,
  linkText,
  openNewTab,
  icon,
  onMouseOver,
  isSelected,
  iconTablet,
}: CardProps) {
  return (
    <div className={classNames(styles.card, { [styles.selectedCard]: isSelected })} onMouseOver={onMouseOver}>
      <div className={styles.iconContainerTablet}>{iconTablet}</div>
      <div className={styles.cardText}>
        <div className={styles.cardTextTop}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
        {openNewTab ? (
          <a className={styles.link} target='_blank' rel='noreferrer' href={link}>
            {linkText}
            <ArrowSVG />
          </a>
        ) : (
          <Link className={styles.link} to={link}>
            {linkText}
            <ArrowSVG />
          </Link>
        )}
      </div>
      <AnimatePresence initial={false} exitBeforeEnter>
        {isSelected && (
          <motion.div
            key={title}
            initial={{
              opacity: 0,
              translateX: -15,
            }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.4, delay: 0.15, staggerChildren: 0.1 }}
            className={styles.iconContainer}
          >
            {icon}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileCard({ iconMobile: Icon, title, description, link, linkText, openNewTab }: CardMobileProps) {
  return (
    <div className={styles.cardMobile}>
      {Icon && (
        <div className={styles.iconContainer}>
          <Icon className={styles.icon} />
        </div>
      )}
      <div className={styles.cardText}>
        <div className={styles.cardTextTop}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
        {openNewTab ? (
          <a className={styles.link} target='_blank' rel='noreferrer' href={link}>
            {linkText}
            <ArrowSVG />
          </a>
        ) : (
          <Link className={styles.link} to={link}>
            {linkText}
            <ArrowSVG />
          </Link>
        )}
      </div>
    </div>
  )
}
