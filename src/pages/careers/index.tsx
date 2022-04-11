import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import HeroSection from '../../components/HeroWithCTA/HeroWithCTA'

import MissionAndVisionSection from '../../components/careers/MissionAndVisionSection/MissionAndVisionSection'
import WhatWeOfferSection, { OurValuesSection } from '../../components/careers/WhatWeOfferSection/WhatWeOfferSection'
import TeamMembersSection, {
  TeamMembersSectionProps,
} from '../../components/careers/TeamMembersSection/TeamMembersSection'
import LifeAtFingerSection from '../../components/careers/LifeAtFingerSection/LifeAtFingerSection'

import { URL } from '../../constants/content'

import { GeneratedPageContext } from '../../helpers/types'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

import styles from './Careers.module.scss'

interface CareersPageProps {
  pageContext: GeneratedPageContext
}
export default function CareersPage({ pageContext }: CareersPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: '', //TODO
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  const data = useStaticQuery<GatsbyTypes.TeamMembersQueryQuery>(graphql`
    query TeamMembersQuery {
      teamMembers: teamMembersYaml {
        pacificAmerica
        mountainAmerica
        centralAmerica
        easternAmerica
        westernEurope
        southeastEurope
        centralEurope
        northeastEurope
        eastAsia
        easternEurope
        southAmericaNorth
        southAmericaSouth
      }
    }
  `)
  const teamMembers = data?.teamMembers as TeamMembersSectionProps

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
      <WhatWeOfferSection />
      <TeamMembersSection {...teamMembers} />
      <OurValuesSection />
      <LifeAtFingerSection />
    </LayoutTemplate>
  )
}
