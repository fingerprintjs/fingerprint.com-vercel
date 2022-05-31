import React, { useState } from 'react'
import { handlePriceChange, pricingTable } from '../../helpers/pricing'
import RangeSlider, { SliderValue } from '../common/RangeSlider'
import classNames from 'classnames'
import Button from '../common/Button'
import styles from './PriceCalculator.module.scss'
import { PATH, URL } from '../../constants/content'
import { ReactComponent as CheckSVG } from '../../img/CheckSVG.svg'
import { ReactComponent as CloseSvg } from '../../img/close.svg'
import { usePriceData } from '../../hooks/usePriceData'

const sliderConfig = {
  min: 0,
  max: 4,
  def: 0,
}

export default function PriceCalculator() {
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
    recalculatePricing(sliderTable[roundedValue].value)
  }

  const recalculatePricing = (value: number) => {
    switch (value) {
      case Infinity:
        setMonthlyPaymentLabel('Contact Us')
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
    <div className={styles.content}>
      <article className={styles.idsPerMonth}>
        <h3 className={styles.title}>Monthly identifications:</h3>
        <RangeSlider
          values={sliderTable}
          currentValue={sliderValue}
          config={sliderConfig}
          handleValueChange={handleSliderChange}
          labelsBelow
        />
      </article>
      <article className={styles.cards}>
        <PricingCard
          label='Fingerprint Pro'
          price={monthlyPaymentLabel}
          billingDescription={
            Math.round(sliderValue) === sliderConfig.min
              ? 'Free forever for developers and small sites up to 20K identifications per month.'
              : 'On-demand pricing based on monthly usage.'
          }
          ctaText={Math.round(sliderValue) === sliderConfig.min ? 'Create Free Account' : 'Start Free Trial'}
          ctaHref={URL.signupUrl}
          featureList={Math.round(sliderValue) === sliderConfig.min ? freeTier : onDemand}
          footNote='* Fingerprint is compliant as the data processor. You need to be compliant as the data controller and use identification for fraud under legitimate interest or ask for user consent.'
          disabled={Math.round(sliderValue) === sliderConfig.max}
        />
        <PricingCard
          enterprise
          label='Enterprise'
          price='Contact Us'
          billingDescription='Get hands-on support and a custom contract for your large scale organization.'
          ctaText='Contact Us'
          ctaHref={PATH.contactSales}
          featureList={enterprise}
        />
      </article>
    </div>
  )
}

interface PricingCardProps {
  label: string
  price: string
  billingDescription: string
  ctaText: string
  ctaHref: string
  featureList: FeatureListProps[]
  footNote?: string
  enterprise?: boolean
  disabled?: boolean
}
function PricingCard({
  label,
  price,
  ctaText,
  ctaHref,
  billingDescription,
  featureList,
  footNote,
  enterprise,
  disabled,
}: PricingCardProps) {
  return (
    <section
      className={classNames(styles.pricingCard, {
        [styles.enterpriseCard]: enterprise,
        [styles.disabled]: disabled,
      })}
    >
      <div className={styles.priceSection}>
        <h3 className={styles.cardLabel}>{label}</h3>
        <span className={styles.price}>{price} </span>
        <span className={styles.period}>per month</span>
      </div>
      <div className={styles.billed}>{billingDescription}</div>
      <Button variant={enterprise ? 'primary' : 'outline'} href={ctaHref} size='big' className={styles.ctaButton}>
        {ctaText}
      </Button>
      <div className={styles.benefitsSection}>
        {featureList.map((feature) => (
          <FeatureList key={feature.title} title={feature.title} features={feature.features} />
        ))}
      </div>
      {footNote && <div className={styles.footNote}>{footNote}</div>}
    </section>
  )
}

interface Feature {
  description: string
  disabled?: boolean
}
interface FeatureListProps {
  title: string
  features: Feature[]
}
function FeatureList({ title, features }: FeatureListProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.header}>{title}</h3>
      <ul>
        {features.map((feature) => (
          <li
            key={feature.description}
            className={classNames(styles.feature, {
              [styles.featureDisabled]: feature.disabled,
            })}
          >
            {feature.disabled ? <CloseSvg className={styles.icon} /> : <CheckSVG className={styles.icon} />}
            {feature.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

const features: Feature[] = [
  {
    description: '99.5% accurate identification',
  },
  {
    description: 'Incognito mode detection',
  },
  {
    description: 'Geolocation',
  },
  {
    description: 'Query API & real-time webhooks',
  },
]

const operationsFreeTier: Feature[] = [
  {
    description: 'GDPR, CCPA compliant*',
  },
  {
    description: '99.9% availability',
  },
  {
    description: 'Documentation',
  },
  {
    description: 'Technical support',
    disabled: true,
  },
]
const operations: Feature[] = [
  {
    description: 'GDPR, CCPA compliant*',
  },
  {
    description: '99.9% availability',
  },
  {
    description: 'Documentation',
  },
  {
    description: 'Technical support',
  },
]

const enterpriseFeatures: Feature[] = [
  {
    description: 'SAML SSO',
  },
  {
    description: '99.9% SLA standard',
  },
  {
    description: 'Additional SLA options available',
  },
  {
    description: 'Premium support',
  },
  {
    description: 'Customer success',
  },
  {
    description: 'Tailored onboarding',
  },
  {
    description: 'Invoice billing',
  },
  {
    description: 'Custom contract with data governance',
  },
  {
    description: 'Additional deployment options',
  },
]

const freeTier: FeatureListProps[] = [
  { title: 'Features', features: features },
  { title: 'Operations', features: operationsFreeTier },
]

const onDemand: FeatureListProps[] = [
  { title: 'Features', features: features },
  { title: 'Operations', features: operations },
]

const enterprise: FeatureListProps[] = [{ title: 'Includes all pro features, plus:', features: enterpriseFeatures }]
