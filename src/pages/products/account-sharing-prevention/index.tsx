import React from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../../helpers/types'
import Container from '../../../components/common/Container'

import HeroSection from '../../../components/accountSharing/HeroSection/HeroSection'
import HowMuchLosingSection from '../../../components/accountSharing/HowMuchLosingSection/HowMuchLosingSection'
import ReadStudyCaseSection from '../../../components/accountSharing/ReadStudyCaseSection/ReadStudyCaseSection'
import PricingSection from '../../../components/accountSharing/PricingSection/PricingSection'
import WhyFingerprintSection from '../../../components/accountSharing/WhyFingerprintSection/WhyFingerprintSection'
import LearnMoreAboutSection from '../../../components/accountSharing/LearnMoreAboutSection/LearnMoreAboutSection'
import BuiltForEngineersSection from '../../../components/accountSharing/BuiltForEngineersSection/BuiltForEngineersSection'
import ContactSalesSection from '../../../components/accountSharing/ContactSalesSection/ContactSalesSection'
import RelatedArticles from '../../../components/RelatedArticles/RelatedArticles'

import useSiteMetadata from '../../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

import styles from './account-sharing.module.scss'

interface AccountSharingProps {
  pageContext: GeneratedPageContext
}
export default function AccountSharingPage({ pageContext }: AccountSharingProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Account Sharing Prevention For SaaS - Fingerprint',
    description:
      'Accurately identify users sharing their account details with our browser fingerprinting API built for developer teams',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection />
      <HowMuchLosingSection />
      <ReadStudyCaseSection />
      <PricingSection />
      <WhyFingerprintSection />
      <LearnMoreAboutSection />
      <BuiltForEngineersSection />
      <ContactSalesSection />
      <Container size='large' className={styles.relatedArticles}>
        <RelatedArticles
          article={{
            tags: ['account sharing'],
          }}
          count={4}
          title='Account takeover prevention blogs'
          titleIsCentered
          limitPostLines
        />
      </Container>
    </LayoutTemplate>
  )
}
