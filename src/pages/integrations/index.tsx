import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import HeroSection from '../../components/integrations/HeroSection/HeroSection'

import { HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

interface IntegrationsProps {
  pageContext: GeneratedPageContext
}
export default function Integrations({ pageContext }: IntegrationsProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Integrations - Fingerprint'
      description='Fingerprint offers integrations and connections with third-party tools, making it easy to get set up in a matter of minutes.'
    />
  )
}
