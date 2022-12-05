import React, { useState, useRef } from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'
import styles from './PricingSection.module.scss'
import { Link } from 'gatsby'
import { PATH } from '../../../constants/content'
import RangeSlider, { SliderValue } from '../../common/RangeSlider'
import { handlePriceChange, pricingTable } from '../../../helpers/pricing'
import { usePriceData } from '../../../hooks/usePriceData'
import Button from '../../common/Button'

import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'
import classNames from 'classnames'
import { useInView } from 'framer-motion'

export default function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const sliderConfig = {
    min: 0,
    max: 4,
    def: 0,
  }

  const { overagePrice, flatAmount } = usePriceData()
  const sliderTable = pricingTable(flatAmount).map(({ label, value }) => {
    return { label, value } as SliderValue
  })

  const defaultValue = 0
  const [sliderValue, setSliderValue] = useState(defaultValue)
  const [monthlyPaymentLabel, setMonthlyPaymentLabel] = useState('$0')

  const handleSliderChange = (newValue: number) => {
    const roundedValue = Math.round(newValue)
    setSliderValue(newValue)
    recalculatePricing(sliderTable[roundedValue].value, overagePrice)
  }

  const recalculatePricing = (value: number, overagePrice: number) => {
    switch (value) {
      case Infinity:
        setMonthlyPaymentLabel('Custom pricing')
        break
      case flatAmount:
        setMonthlyPaymentLabel('$0')
        break
      default: {
        const newPrice = handlePriceChange(value, overagePrice)
        setMonthlyPaymentLabel(newPrice)
        break
      }
    }
  }
  return (
    <Section className={styles.root}>
      <div className={styles.backgroundLayer} />
      <Container
        size='large'
        className={classNames(styles.container, {
          [styles.visible]: isInView,
        })}
      >
        <div className={styles.sections}>
          <section className={styles.descriptionSection}>
            <div className={styles.labelWrapper}>
              <span className={styles.label}>Pricing</span>
            </div>
            <h2 className={styles.title}>Flexible and transparent pricing</h2>
            <p className={styles.description} ref={ref}>
              Use Fingerprint for free up to 20K identifications per month. Our API call-based pricing scales with you,
              whatever your use case.
            </p>
            <Link className={styles.link} to={PATH.pricingUrl}>
              Full Pricing Details
              <ArrowSVG className={styles.arrow} />
            </Link>
          </section>
          <section className={styles.pricingSection}>
            <div className={styles.idsPerMonth}>
              <h3 className={styles.title}>
                How many <span className={styles.orange}>identification API calls</span>
                <br />
                per month do you need?
              </h3>
            </div>

            <div className={styles.slider}>
              <RangeSlider
                values={sliderTable}
                currentValue={sliderValue}
                config={sliderConfig}
                handleValueChange={handleSliderChange}
              />
            </div>

            <div className={styles.payment}>
              {Math.round(sliderValue) !== sliderConfig.max ? (
                <div className={styles.pricingCard}>
                  <span className={styles.starting}>Starting at</span>
                  <div className={styles.priceCard}>
                    <span className={styles.price}>{monthlyPaymentLabel}</span>
                    <span className={styles.period}>{Math.round(sliderValue) !== sliderConfig.max && 'per month'}</span>
                  </div>
                </div>
              ) : (
                <div className={styles.contactSalesCard}>
                  <Button
                    href={PATH.contactSales}
                    size='big'
                    variant='orangeGradientOutline'
                    className={styles.contactSalesButton}
                  >
                    Contact Sales
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </Container>
    </Section>
  )
}
