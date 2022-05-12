import { graphql } from 'gatsby'
import React from 'react'
import Container from '../components/common/Container'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import { GeneratedPageContext } from '../helpers/types'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../hooks/useSiteMetadata'
import PaginationNav from '../components/PaginationNav/PaginationNav'

import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import Grid from '../components/Grid/Grid'
import CaseStudy, { mapToCaseStudy } from '../components/CaseStudy/CaseStudy'

interface CaseStudyProps {
  data: GatsbyTypes.CaseStudiesQuery
  pageContext: CaseStudiesContext
}
export default function CaseStudies({ data, pageContext }: CaseStudyProps) {
  const { edges: caseStudiesData } = data.caseStudies
  const caseStudies = caseStudiesData.map(({ node }) => mapToCaseStudy(node))
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Fingerprint Case Studies | Fingerprint',
    description: 'Success stories from our customers.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  const { currentPage, numPages } = pageContext

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Section>
        <Container size='large'>
          <h1>Case Studies</h1>

          <Grid
            items={caseStudies.map((caseStudy) => {
              return <CaseStudy key={caseStudy.path} {...caseStudy} />
            })}
            perRow={4}
          />
          <PaginationNav currentPage={currentPage} numPages={numPages} basePath='/case-studies/' />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query CaseStudies($skip: Int!, $limit: Int!) {
    caseStudies: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(case-study)/.*\\.md$/" } }
      limit: $limit
      skip: $skip
    ) {
      ...CaseStudyData
    }
  }
`

interface CaseStudiesContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}
