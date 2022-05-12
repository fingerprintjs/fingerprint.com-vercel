import React from 'react'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { LayoutTemplate } from '../../components/Layout'
import { GeneratedPageContext } from '../../helpers/types'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'

import PageContent from '../../components/contact-sales/PageContent'

interface ContactSalesPageProps {
  pageContext: GeneratedPageContext
}
export default function ContactSalesPage({ pageContext }: ContactSalesPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Contact Sales - Fingerprint Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <PageContent />
    </LayoutTemplate>
  )
}
