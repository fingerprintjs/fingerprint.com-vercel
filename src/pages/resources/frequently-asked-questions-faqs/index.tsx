import React from 'react'

import { GeneratedPageContext } from '../../../helpers/types'

import { HeadProps, Link } from 'gatsby'
import { SEO } from '../../../components/SEO/SEO'
import { LayoutTemplate } from '../../../components/Layout'
import Container from '../../../components/common/Container'
import Section from '../../../components/common/Section'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import Accordion from '../../../components/common/Collapsible'
import { scrollToElementById } from '../../../helpers/scrollToElementByID'
import { URL, PATH, DOC_URL } from '../../../constants/content'

import styles from './Faq.module.scss'

interface FaqPageProps {
  pageContext: GeneratedPageContext
}
export default function FaqPage({ pageContext }: FaqPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Section className={styles.section}>
        <Container size='large' className={styles.container}>
          <header className={styles.header}>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
          </header>
          <ul className={styles.toc}>
            {faqs.map((faq) => (
              <li className={styles.item} key={faq.id}>
                <a className={styles.itemLink} onClick={() => scrollToElementById(faq.id)}>
                  {faq.title}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.faqSection}>
            {faqs.map((faq) => (
              <FAQBlock faqBlock={faq} key={faq.id} />
            ))}
          </div>
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

interface FAQBlockProps {
  faqBlock: { title: string; id: string; faq: { question: string; answer: React.ReactNode }[] }
}

function FAQBlock({ faqBlock }: FAQBlockProps) {
  return (
    <div className={styles.faq}>
      <h3 className={styles.faqTitle} id={faqBlock.id}>
        {faqBlock.title}
      </h3>
      <Accordion plusIcon sections={faqBlock.faq.map((entry) => ({ title: entry.question, content: entry.answer }))} />
    </div>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Frequently Asked Questions - Fingerprint Pro'
      description='Get answers to your questions about our open-source product, our premium product Fingerprint Pro, the basics of browser fingerprinting, device fingerprints, common types of fraud, and more.'
    />
  )
}

export const faqs = [
  {
    title: 'Fingerprint Pro',
    id: 'fingerprint-pro',
    faq: [
      {
        question: "What is Fingerprint Pro's uptime SLA?",
        answer: (
          <p className={styles.faqContent}>
            Fingerprint Pro guarantees at least a 99.9% uptime. In addition, you can check our current status, view
            previous incidents, and subscribe to updates on our{' '}
            <a href={URL.statusUrl} target='_blank' rel='noreferrer' className={styles.link}>
              status page
            </a>
            .
          </p>
        ),
      },
      {
        question: 'What is your typical response time when there is an issue or bug?',
        answer: (
          <p className={styles.faqContent}>
            Response times are based on the issue&apos;s size or the bug&apos;s severity and are approached on a
            case-by-case basis.
          </p>
        ),
      },
      {
        question: 'Do you provide a hosted service?',
        answer: (
          <p className={styles.faqContent}>
            Fingerprint uses a series of global Amazon Web Services (AWS) datacenters with enterprise-grade physical and
            network security.
          </p>
        ),
      },
      {
        question: 'How do the machine learning aspects of Fingerprint work?',
        answer: (
          <p className={styles.faqContent}>
            Fingerprint Pro&apos;s server-side API processes and analyzes a vast amount of data, searching for patterns
            and recurring fraudulent activity.
          </p>
        ),
      },
      {
        question: 'What types of companies do you typically work with?',
        answer: (
          <p className={styles.faqContent}>
            Fingerprint works with companies of all sizes and industries like eCommerce, Financial Services, Travel,
            Gaming, Crypto, and more across many regions, including the US, EU, APAC, and LATAM.
          </p>
        ),
      },
      {
        question: 'What can you do with a visitorID once Fingerprint generates it?',
        answer: (
          <p className={styles.faqContent}>
            Once you&apos;ve obtained a VisitorID value, you can use it for various use cases like fraud prevention,
            eCommerce personalization, checkout security, and more.
          </p>
        ),
      },
      {
        question: 'Is there a limit on API calls? How does pricing work?',
        answer: (
          <p className={styles.faqContent}>
            Fingerprint has tiered self-serve plans that scale by the number of API calls per month up until 1
            million/month. After that, anything over requires an enterprise contract. For more pricing information,
            click{' '}
            <Link to={PATH.pricingUrl} className={styles.link}>
              here
            </Link>
            .
          </p>
        ),
      },
      {
        question: 'What are the advantages of using the custom subdomain?',
        answer: (
          <p className={styles.faqContent}>
            The custom subdomain allows API calls through ad blockers and specific security policies.
          </p>
        ),
      },
      {
        question:
          'Should we implement Fingerprint Pro on specific pages, every page, or the first page where a visitor lands?',
        answer: (
          <p className={styles.faqContent}>
            The desired use case largely dictates the implementation of Fingerprint. For more information on what pages
            you should consider implementing, check out our best practices doc{' '}
            <Link to={DOC_URL.bestPracticesUrl} className={styles.link}>
              here
            </Link>
            .
          </p>
        ),
      },
      {
        question:
          'How do you count users? For example, if the same person comes in multiple times with the same visitorID does that count as multiple API calls?',
        answer: (
          <p className={styles.faqContent}>
            Yes, every time the API is called to generate a visitorID, even if for the same user, it will count towards
            the API call volume. This is because every time it&apos;s called, our servers need to process it
            irrespective of being a new ID vs an old one.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Open-source software',
    id: 'open-source',
    faq: [
      {
        question: 'What is open-source software?',
        answer: (
          <p className={styles.faqContent}>
            Open source software includes public source code access, which anyone can review, edit, and add over time.
            Generally, open source software is free for anyone to use and it can be incorporated into other software.
            Some famous examples of open source software include{' '}
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.mozilla.org/en-US/firefox/products/'
              className={styles.link}
            >
              Firefox
            </a>
            ,{' '}
            <a target='_blank' rel='noreferrer' href='https://www.openoffice.org/' className={styles.link}>
              OpenOffice
            </a>
            , and{' '}
            <a target='_blank' rel='noreferrer' href='https://www.mysql.com/' className={styles.link}>
              MySQL
            </a>
            .
          </p>
        ),
      },
      {
        question: 'What is FingerprintJS?',
        answer: (
          <p className={styles.faqContent}>
            FingerprintJS is a browser fingerprinting library that queries browser attributes and computes a hashed
            visitor identifier from them. Unlike cookies and local storage, a fingerprint stays the same in
            incognito/private mode, even when browser data is purged.
          </p>
        ),
      },
      {
        question: 'How can I find your open-source library, FingerprintJS?',
        answer: (
          <p className={styles.faqContent}>
            Our open-source software, FingerprintJS, is{' '}
            <a target='_blank' rel='noreferrer' href={URL.githubRepoUrl} className={styles.link}>
              available on GitHub
            </a>
            . FingerprintJS is the #1 browser fingerprinting solution on GitHub, with over 17,000 stars.
          </p>
        ),
      },
      {
        question: 'Is your open-source software always free to use?',
        answer: <p className={styles.faqContent}>FingerprintJS will always be free to use.</p>,
      },
      {
        question: 'How is Fingerprint Pro different from FingerprintJS open source?',
        answer: (
          <p className={styles.faqContent}>
            You can view a complete breakdown of the two in our{' '}
            <a target='_blank' rel='noreferrer' href={DOC_URL.proVsOpenUrl} className={styles.link}>
              technical documentation
            </a>
            . However, the most significant difference is that FingerprintJS is less accurate than the Pro version
            because it does not include additional server-side identification methods, as well as machine learning
            processing included in the Pro version.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Browser Fingerprinting',
    id: 'browser-fingerprinting',
    faq: [
      {
        question: 'What is browser fingerprinting? How does browser fingerprinting work?',
        answer: (
          <>
            <p className={styles.faqContent}>
              Browser fingerprinting is a technique of identifying a website&apos;s visitors to be uniquely identifiable
              among other visitors. It combines many different pieces of information about the visitor, known as
              signals, to help machine learning ingest the signals and assign a unique identifier to a user.
            </p>
            <p className={styles.faqContent}>
              Examples of signals that could be collected during browser fingerprints include, device operating system,
              browser version, preferred language, or screen resolution.
            </p>
          </>
        ),
      },
      {
        question: 'Is browser fingerprinting safe?',
        answer: (
          <>
            <p className={styles.faqContent}>
              For a business, browser fingerprinting aims to identify visitors to a site better and separate those that
              may be fraudulent and those that may not. Therefore, we do not track across sites nor reveal PII
              (personally identifiable information) during our fingerprinting process.
            </p>
            <p className={styles.faqContent}>
              The benefits of browser fingerprinting as a consumer include an overall safer browsing experience and user
              experience when using software or viewing a website.
            </p>
          </>
        ),
      },
      {
        question: 'What is my browser fingerprint?',
        answer: (
          <p className={styles.faqContent}>
            You can view your detected VisitorID on{' '}
            <Link to={PATH.demoUrl} className={styles.link}>
              our Demo page
            </Link>
            .
          </p>
        ),
      },
      {
        question: 'Can you detect a user in incognito mode or on a VPN?',
        answer: (
          <p className={styles.faqContent}>
            Yes, we can uniquely identify website visitors in most cases using an incognito mode or a VPN. This is
            because we ingest over 100 signals about a visitor before assigning them a unique identifier. So, even if
            they change a signal, such as IP address, we can still identify them with 99.5% accuracy.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Device Identification',
    id: 'device-identification',
    faq: [
      {
        question: 'What is device identification?',
        answer: (
          <p className={styles.faqContent}>
            Device identification is a process in which several signals from a device, user, browser, etc are collected
            and used to create and assign a unique number identifying that device. The act of signal collection can vary
            by methodology and technology.
          </p>
        ),
      },
      {
        question: 'How does device identification differ from browser fingerprinting?',
        answer: (
          <p className={styles.faqContent}>
            Browser fingerprinting is just one of the many signal collection forms incorporated into device
            identification. Previously, device identification was achieved through signals like IP addresses and
            cookies. However, browser fingerprinting is a much more robust method given the number of signals collected,
            leading to the most accurate device identification generation.
          </p>
        ),
      },
      {
        question: 'Does Fingerprint Pro do device identification or browser fingerprinting?',
        answer: (
          <p className={styles.faqContent}>
            To generate our unique VisitorID, Fingerprint incorporates device identification and browser fingerprinting.
            For mobile apps, we identify devices; for web and mobile browsers, we identify browsers as this allows us to
            achieve higher accuracy.
          </p>
        ),
      },
      {
        question: 'What is an IMEI, and is it part of a device identification?',
        answer: (
          <p className={styles.faqContent}>
            IMEI stands for “International Mobile Equipment Identity.” It’s a unique number for identifying a device on
            a mobile network, and you can think of it as your phone’s social security number. IMEI factors into device
            identification of mobile devices but isn’t the only signal utilized when building a fingerprint.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Accuracy',
    id: 'accuracy',
    faq: [
      {
        question: 'How is your accuracy % defined?',
        answer: (
          <p className={styles.faqContent}>
            We define our accuracy by how many returning visitors to a site we successfully identify as returning
            visitors, not new ones. So, for example, a 99.5% accuracy rate means we correctly identify 995 out of 1000
            returning visitors on any site.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Privacy, Security, & Legal',
    id: 'privacy-security-legal',
    faq: [
      {
        question: 'What information does Fingerprint store? Do you collect PII?',
        answer: (
          <p className={styles.faqContent}>
            We collect close to 100 signals from the browser to create a snapshot. This snapshot is used to generate the
            fingerprint. We store than on our servers for 90 days and don&apos;t collect any PII data except for IP
            address.
          </p>
        ),
      },
      {
        question: 'How do changes within browsers regarding privacy and tracking affect Fingerprint?',
        answer: (
          <p className={styles.faqContent}>
            Security and privacy policies are rapidly changing; thus, the available signals from a user’s device are
            very dynamic. This requires constant tuning, machine learning, and other advanced techniques to keep our
            accuracy high. Due to this, we invest heavily in this exact area of the business.
          </p>
        ),
      },
      {
        question: 'Is Fingerprint Pro GDPR compliant? ',
        answer: (
          <p className={styles.faqContent}>
            Yes - Fingerprint is GDPR compliant. You can learn more about our security certifications on{' '}
            <Link to={PATH.security} className={styles.link}>
              our Security page
            </Link>
            .
          </p>
        ),
      },
      {
        question: 'Is Fingerprint Pro CCPA compliant?',
        answer: (
          <p className={styles.faqContent}>
            Yes - Fingerprint is CCPA compliant. You can learn more about our security certifications on{' '}
            <Link to={PATH.security} className={styles.link}>
              our Security page
            </Link>
            .
          </p>
        ),
      },
      {
        question: 'Does Fingerprint Pro or FingerprintJS track website traffic automatically?',
        answer: (
          <p className={styles.faqContent}>
            We never automatically track traffic - our customers can configure under what conditions visitors are
            tracked, and we never do cross-domain tracking.
          </p>
        ),
      },
      {
        question: 'Is Fingerprint SOC2 Compliant?',
        answer: (
          <>
            <p className={styles.faqContent}>
              Yes - Fingerprint is SOC 2 compliant. You can learn more about our security certifications on{' '}
              <Link to={PATH.security} className={styles.link}>
                our Security page
              </Link>
              .
            </p>
            <p className={styles.faqContent}>
              Please{' '}
              <Link to={PATH.contactSales} className={styles.link}>
                contact sales
              </Link>{' '}
              if you want to see our SOC 2 report.
            </p>
          </>
        ),
      },
      {
        question: 'Does Fingerprint Pro require consent?',
        answer: (
          <p className={styles.faqContent}>
            Our technology is intended to be used for fraud detection only; for this case, no user consent is required.
            However, any use outside of fraud detection must comply with GDPR user consent rules.
          </p>
        ),
      },
      {
        question: 'Where is Fingerprint Pro’s data stored?',
        answer: (
          <>
            <p className={styles.faqContent}>
              When you create your account, you can choose between Global/US data storage (Richmond, Virginia), data EU
              storage (Frankfurt, Germany) and Asia-Pacific storage (Mumbai).
            </p>
            <p className={styles.faqContent}>
              We can set up servers in additional locations for enterprise customers. To learn more, please{' '}
              <Link to={PATH.contactSales} className={styles.link}>
                contact sales
              </Link>
              .
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Common Fraud Types',
    id: 'common-fraud-types',
    faq: [
      {
        question: 'What are the types of payment fraud?',
        answer: (
          <p className={styles.faqContent}>
            Digital payment fraud can take many forms. We help businesses detect several of them, including credit card
            fraud, credit card chargebacks (friendly fraud), coupon and promo code abuse, and card cracking. You can
            learn more about each{' '}
            <Link to={PATH.paymentFraud} className={styles.link}>
              here
            </Link>
            .
          </p>
        ),
      },
      {
        question: 'What is account takeover fraud (ATO)?',
        answer: (
          <>
            <p className={styles.faqContent}>
              <Link to={PATH.accountTakeover} className={styles.link}>
                Account takeovers
              </Link>{' '}
              can appear in several forms, including credential stuffing and phishing attempts.
            </p>
            <p className={styles.faqContent}>
              With credential stuffing, fraudsters will try to test thousands of login details they’ve obtained from an
              external source like a data breach of another site to try and gain access to a user’s accounts. This
              happens when users reuse passwords or unsecured passwords across multiple sites.
            </p>
            <p className={styles.faqContent}>
              Phishing attempts are some of the most challenging fraud attempts to detect due to their level of social
              engineering sophistication. Phishing attempts happen in several ways, including through email, social
              media, phone calls, false web pages, and even direct mail.
            </p>
          </>
        ),
      },
      {
        question: 'What is multi-accounting fraud? ',
        answer: (
          <>
            <p className={styles.faqContent}>
              Multi-accounting fraud is when one person signs up for multiple accounts with the same service. This can
              happen for non-nefarious reasons or in attempts to gain something, including a winning advantage in an
              online poker game.
            </p>
            <p className={styles.faqContent}>
              Multi-accounting is a growing problem in online gambling, gaming, and poker, and we discuss ways to detect
              and prevent multi-accounting in those industries{' '}
              <Link to='/blog/stop-multi-accounting-gaming/' className={styles.link}>
                here
              </Link>
              .
            </p>
          </>
        ),
      },
    ],
  },
]
