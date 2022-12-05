import React, { useState, useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import classNames from 'classnames'
import ClickOutside from '../../../helpers/ClickOutside'
import useIntersectionObserver from '../../../hooks/useIntersectionObserver'

import styles from './ProLayersSection.module.scss'

enum layersOptions {
  X1 = '0',
  X2 = '1',
  X3 = '2',
  X4 = '3',
  NoLayer = '4',
}

export default function ProLayersSection() {
  const [HoverIndex, setHoverIndex] = useState(layersOptions.NoLayer)
  const showOssMobile = HoverIndex === layersOptions.X4 || HoverIndex === layersOptions.NoLayer
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting

  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <div className={styles.cardContainer}>
          <span className={styles.labelWrapper}>
            <span className={styles.label}>how it works</span>
          </span>
          <h2 className={styles.title}>Pro is powered by Open Source</h2>
          <p className={styles.description}>
            Generate permanent, highly accurate visitor identifiers for every web visitor. Identifiers remain the same
            for years, even as browsers are upgraded.
          </p>
          <ClickOutside handleClickOutside={() => setHoverIndex(layersOptions.NoLayer)}>
            <div className={styles.cards}>
              <div className={styles.mobileHoverAreas}>
                <span className={classNames(styles.tap, { [styles.visible]: isVisible })}>TAP TO DISCOVER LAYERS!</span>
                {Object.keys(layersOptions).map((key, index) => {
                  return (
                    <div
                      key={index}
                      className={styles[`hoverAreaMobile${index + 1}`]}
                      onMouseOut={(e) => {
                        e.preventDefault()
                        setHoverIndex(layersOptions.NoLayer)
                      }}
                      onMouseOver={(e) => {
                        e.preventDefault()
                        setHoverIndex(layersOptions[key])
                      }}
                    />
                  )
                })}
              </div>

              <div
                ref={ref}
                className={classNames(styles.cardImage, {
                  [styles.cardImage1]: HoverIndex === layersOptions.X1,
                  [styles.cardImage2]: HoverIndex === layersOptions.X2,
                  [styles.cardImage3]: HoverIndex === layersOptions.X3,
                  [styles.cardImage4]: HoverIndex === layersOptions.X4,
                })}
              >
                <span className={classNames(styles.imageArrow, styles.onlyMobile)} />
              </div>

              <div className={styles.cardsSection}>
                <span
                  className={classNames(styles.cardLabel, {
                    [styles.onlyMobile]: !showOssMobile,
                  })}
                >
                  Runs on Server
                </span>
                <div
                  className={styles.hoverArea1}
                  onMouseOut={(e) => {
                    e.preventDefault()
                    setHoverIndex(layersOptions.NoLayer)
                  }}
                  onMouseOver={(e) => {
                    e.preventDefault()
                    setHoverIndex(layersOptions.X1)
                  }}
                />
                <Card
                  title='Server-side analysis and machine learning'
                  description='Holistic view of all attributes and layers below to generate the most stable and accurate visitor ID'
                  hoverElement={HoverIndex === '0'}
                />
                <div
                  className={styles.hoverArea2}
                  onMouseOut={(e) => {
                    e.preventDefault()
                    setHoverIndex(layersOptions.NoLayer)
                  }}
                  onMouseOver={(e) => {
                    e.preventDefault()
                    setHoverIndex(layersOptions.X2)
                  }}
                />
                <Card
                  title='Storage and deduplication'
                  description='Collects multiple attributes to do fuzzy matching and handle browser and OS upgrades'
                  hoverElement={HoverIndex === '1'}
                />
                <div
                  className={styles.hoverArea3}
                  onMouseOut={(e) => {
                    e.preventDefault()
                    setHoverIndex(layersOptions.NoLayer)
                  }}
                  onMouseOver={(e) => {
                    e.preventDefault()
                    setHoverIndex(layersOptions.X3)
                  }}
                />
                <Card
                  title='Cookie and local storage management'
                  description='Leverages cryptographically signed cookies and local storage to reliably associate visitor identifier values with fingerprintable attributes'
                  hoverElement={HoverIndex === '2'}
                />
                <div
                  className={styles.hoverArea4}
                  onMouseOut={(e) => {
                    e.preventDefault()
                    setHoverIndex(layersOptions.NoLayer)
                  }}
                  onMouseOver={(e) => {
                    e.preventDefault()
                    setHoverIndex(layersOptions.X4)
                  }}
                />
                <span
                  className={classNames(styles.cardLabel, styles.orangeTitle, {
                    [styles.onlyMobile]: showOssMobile,
                  })}
                >
                  Runs in Browser
                </span>
                <Card
                  subTitle='Open Source'
                  title='Browser fingerprinting library'
                  description='Generates browser fingerprints from matching browser attributes'
                  orangeVariant
                  showMobile={showOssMobile}
                  hoverElement={HoverIndex === '3'}
                />
              </div>
            </div>
          </ClickOutside>
        </div>
      </Container>
      <div className={styles.backgroundLayer} />
    </Section>
  )
}

interface CardProps {
  title: string
  description: string
  subTitle?: string
  orangeVariant?: boolean
  showMobile?: boolean
  hoverElement?: boolean
}
function Card({ title, description, subTitle, orangeVariant, showMobile, hoverElement }: CardProps) {
  return (
    <div
      className={classNames(styles.card, {
        [styles.cardOrange]: orangeVariant,
        [styles.hoverElement]: hoverElement && !orangeVariant,
        [styles.hoverElementOrange]: hoverElement && orangeVariant,
        [styles.onlyMobile]: showMobile,
      })}
    >
      <div>
        {subTitle && <h4 className={styles.cardSubtitle}>{subTitle}</h4>}
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
