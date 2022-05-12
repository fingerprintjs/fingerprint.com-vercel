import React from 'react'
import AlternatingImagesText, { BlockWithImage } from '../../AlternatingImagesText/AlternatingImagesText'

import Section from '../../common/Section'

import { ReactComponent as MinimizeFraudSVG } from './images/minimizeFraud.svg'
import { ReactComponent as IncreaseApprovalSVG } from './images/increaseApproval.svg'
import { ReactComponent as StreamlineSVG } from './images/streamline.svg'
import { ReactComponent as IdentificationSVG } from './images/identification.svg'
import { ReactComponent as DataLakeSVG } from './images/dataLake.svg'

import styles from './BenefitsSection.module.scss'

export default function BenefitsSection() {
  return (
    <Section className={styles.benefitsSection}>
      <AlternatingImagesText blocks={blocks} />
    </Section>
  )
}

const blocks = [
  {
    title: 'Minimize Fraud and Credit Loss',
    image: MinimizeFraudSVG,
    content: (
      <p>
        Successful BNPL companies rely on sophisticated fraud and credit risk models to make approval decisions while
        introducing as little friction as possible for the purchaser. Fingerprint Pro&apos;s best-in-class accuracy,
        cross-merchant device identification makes it possible to identify significantly more returning visitors and
        shut down fraud with zero added friction.
      </p>
    ),
  },
  {
    title: 'Increase Approval Rates ',

    image: IncreaseApprovalSVG,
    content: (
      <p>
        Identify 99.5% of returning visitors with passive authentication, reducing friction for trusted customers.
        Fingerprint Pro&apos;s visitorIDs remain stable for months, not days, making it possible to authenticate
        occasional purchasers with pinpoint accuracy.
      </p>
    ),
  },
  {
    title: 'Streamline Checkout and Onboarding',
    image: StreamlineSVG,
    content: (
      <p>
        Fingerprint Pro can be used to save customer preferences across separate merchant applications, allowing for
        enhanced “remember me” functionality. Link onboarding and transaction flows with high accuracy, reducing the
        likelihood of user impersonation.
      </p>
    ),
  },
  {
    title: 'Identification Accuracy on Every Platform',
    image: IdentificationSVG,
    content: (
      <p>
        Fingerprint Pro works for web, iOS and Android applications, as well as in third-party installations as part of
        a merchant&apos;s checkout flow. On every platform, Fingerprint Pro outshines the competition with high
        accuracy, easy integration, and minimal impact on application performance.
      </p>
    ),
  },
  {
    title: 'Build your data lake with advanced device signals',
    image: DataLakeSVG,
    content: (
      <p>
        Incorporate more than 100+ signals to your risk models for advanced fraud analysis:
        <ul>
          <li>ID confidence score</li>
          <li>Individual device fingerprinting signals</li>
          <li>IP and geolocation</li>
          <li>Incognito mode detection</li>
        </ul>
      </p>
    ),
  },
] as BlockWithImage[]
