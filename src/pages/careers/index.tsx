import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import HeroSection from '../../components/HeroWithCTA/HeroWithCTA'
import MissionAndVisionSection from '../../components/careers/MissionAndVisionSection/MissionAndVisionSection'
import { URL } from '../../constants/content'

import { GeneratedPageContext } from '../../helpers/types'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

import styles from './Careers.module.scss'

interface GitHubProps {
  pageContext: GeneratedPageContext
}
export default function GitHubPage({ pageContext }: GitHubProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: '', //TODO
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection
        className={styles.heroSection}
        title='Join Our Team'
        ctaText='Explore our jobs'
        ctaHref={URL.careersUrl}
        openNewTab
        variant='secondary'
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </HeroSection>
      <MissionAndVisionSection />
    </LayoutTemplate>
  )
}
