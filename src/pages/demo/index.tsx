import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import { URL } from '../../constants/content'

import HeroSection from '../../components/HeroWithCTA/HeroWithCTA'
import DemoSection from '../../components/demo/DemoSection/DemoSection'
import SolveAnyFraudSection from '../../components/demo/SolveAnyFraudSection/SolveAnyFraudSection'
import GetStartedSection from '../../components/demo/GetStartedSection/GetStartedSection'
import CatchFraudstersSection from '../../components/demo/DemoSection/VisitsSection/CatchFraudstersSection'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

interface DemoPageProps {
  pageContext: GeneratedPageContext
}
export default function DemoPage({ pageContext }: DemoPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Technical Demo - Fingerprint Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection title='Fingerprint Pro Demo' ctaText='Create Free Account' ctaHref={URL.signupUrl}>
        Identify anonymous site visitors with 99.5% accuracy to prevent online fraud
      </HeroSection>
      <DemoSection />
      <CatchFraudstersSection />
      <SolveAnyFraudSection />
      <GetStartedSection />
    </LayoutTemplate>
  )
}
