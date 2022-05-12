import React from 'react'

import { LayoutTemplate } from '../../components/Layout'
import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import Collapsible from '../../components/common/Collapsible'
import Button from '../../components/common/Button'
import { PATH, URL } from '../../constants/content'
import PriceCalculator from '../../components/PriceCalculator'
import { Link } from 'gatsby'

import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { usePriceData } from '../../hooks/usePriceData'
import styles from './Pricing.module.scss'

interface PricingPageProps {
  pageContext: GeneratedPageContext
}
export default function PricingPage({ pageContext }: PricingPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Pricing - Fingerprint Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeaderSection />
      <CalculatorSection />
      <FAQSection />
      <ContactSalesSection />
    </LayoutTemplate>
  )
}

function HeaderSection() {
  return (
    <Section className={styles.headerSection}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerDescription}>Transparent pricing for developers and businesses</p>
      </Container>
    </Section>
  )
}

function CalculatorSection() {
  return (
    <Section className={styles.calculator}>
      <Container size='large'>
        <PriceCalculator />
      </Container>
    </Section>
  )
}

function FAQSection() {
  const { overagePrice, flatAmount, prepaidQuantity } = usePriceData()

  const faq = [
    {
      question: 'How does billing for Fingerprint Pro work?',
      answer: (
        <p className={styles.faqContent}>
          Customers are billed on a monthly basis based on API requests made over the billing period. The minimum paid
          plan is ${(overagePrice / 100) * prepaidQuantity}/mo for {prepaidQuantity.toLocaleString()} API requests - any
          additional requests will be charged at a rate of ${(overagePrice * 1000) / 100} per 1,000 requests.
          <br />
          <br />
          Developers and small sites can access Fingerprint Pro for free forever for a maximum of{' '}
          {flatAmount.toLocaleString()} API requests per month.
        </p>
      ),
    },
    {
      question: 'Do you offer annual billing and discounts?',
      answer: (
        <p className={styles.faqContent}>
          Yes - we offer annual billing and discounts. Please{' '}
          <Link to={PATH.contactSales} className={styles.link}>
            contact sales{' '}
          </Link>
          for details on annual pricing.
        </p>
      ),
    },
    {
      question: 'I am a developer. Can I use Fingerprint Pro for free?',
      answer: (
        <p className={styles.faqContent}>
          Yes - developers and small sites can use Fingerprint Pro for free forever, with up to{' '}
          {flatAmount.toLocaleString()} API requests per month.
        </p>
      ),
    },
    {
      question: 'How does the unlimited 10 day free trial work?',
      answer: (
        <p className={styles.faqContent}>
          New signups can request a 10-day trial whenever they want with no API request limits. After the trial period
          ends, the account will be upgraded to a paid plan.
        </p>
      ),
    },
    {
      question: 'How does the $0 free plan differ from a paid Pro plan?',
      answer: (
        <p className={styles.faqContent}>
          The only difference between our free plan and paid Pro plan is that customers can only use up to{' '}
          {flatAmount.toLocaleString()} API requests per month on the free plan. There are no differences in features,
          functionality or accuracy between the free and paid plan.
        </p>
      ),
    },
    {
      question: 'How many identifications do I need?',
      answer: (
        <p className={styles.faqContent}>
          Fingerprint Pro works best if the JavaScript agent is installed and runs an identification for every visitor
          on every page of your website. To estimate the number of identifications this installation would use, you can
          look at your website’s total number of monthly pageviews using a client- or server-side website analytics
          service (e.g. Google Analytics, Segment, Netlify Analytics).
          <br />
          <br />
          If you decide to install Fingerprint Pro only on several key pages (e.g. signup, login, or prepayment), then
          you use pageviews for those specific pages as an estimate for identifications.
          <br />
          <br />
          Finally, if you plan to configure Fingerprint Pro to only identify visitors when they first land on your site,
          you can use monthly user sessions to estimate identifications needed.
          <br />
          <br />
          For assistance in estimating the number of identifications needed for your use-case, please{' '}
          <Link to={PATH.contactSales} className={styles.link}>
            contact sales.
          </Link>
        </p>
      ),
    },
    {
      question: 'What is Fingerprint Pro’s uptime?',
      answer: (
        <p className={styles.faqContent}>
          Fingerprint guarantees at least a 99.9% uptime. You can check our current status, view previous incidents and
          subscribe to updates on our{' '}
          <a href={URL.statusUrl} className={styles.link}>
            status page.
          </a>
        </p>
      ),
    },
    {
      question: 'Is Fingerprint Pro GDPR compliant?',
      answer: (
        <p className={styles.faqContent}>
          Yes - Fingerprint is GDPR compliant.
          <br />
          <br />
          Our technology is intended to be used for fraud detection only - for this use case, no user consent is
          required. Any use outside of fraud detection would need to comply with GDPR user consent rules.
          <br />
          <br />
          We never automatically track traffic - our customers can configure under what conditions visitors are tracked,
          and we never do cross-domain tracking.
        </p>
      ),
    },
    {
      question: 'Where is Fingerprint Pro’s data stored?',
      answer: (
        <p className={styles.faqContent}>
          When you create your account you can choose between Global/US data storage (Richmond, VA) and data EU storage
          (Frankfurt Germany).
          <br />
          <br />
          We can set up servers in additional locations for enterprise customers. To learn more, please{' '}
          <Link to={PATH.contactSales} className={styles.link}>
            contact sales.
          </Link>
        </p>
      ),
    },
    {
      question: 'Is Fingerprint SOC 2 compliant?',
      answer: (
        <p className={styles.faqContent}>
          Yes - Fingerprint is{' '}
          <Link to='/blog/soc-2-type-1/' className={styles.link}>
            SOC 2 compliant.
          </Link>
          <br />
          <br />
          If you would like to see our SOC 2 Type 1 report, please{' '}
          <Link to={PATH.contactSales} className={styles.link}>
            contact sales.
          </Link>
        </p>
      ),
    },
  ]

  return (
    <Section className={styles.faqSection}>
      <Container size='large' className={styles.faqContainer}>
        <FAQBlock faq={faq} />
      </Container>
    </Section>
  )
}

interface FAQBlockProps {
  faq: { question: string; answer: React.ReactNode }[]
}

function FAQBlock({ faq }: FAQBlockProps) {
  return (
    <div>
      <header className={styles.faqHeader}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      </header>
      <div>
        <Collapsible plusIcon sections={faq.map((entry) => ({ title: entry.question, content: entry.answer }))} />
      </div>
    </div>
  )
}

function ContactSalesSection() {
  return (
    <Section className={styles.contactSection}>
      <Container className={styles.contactContainer}>
        <h1 className={styles.contactTitle}>Not sure which plan is right for you?</h1>
        <Button href={PATH.contactSales} variant='primary' size='big' className={styles.contactButton}>
          Contact Sales
        </Button>
      </Container>
    </Section>
  )
}
