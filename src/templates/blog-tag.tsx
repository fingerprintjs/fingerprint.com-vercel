import { graphql, HeadProps } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { mapToPost } from '../components/Post/Post'
import Posts from '../components/Posts/Posts'
import { GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import { kebabToTitle } from '../helpers/case'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { SEO } from '../components/SEO/SEO'
import styles from './blog-tag.module.scss'

interface BlogTagProps {
  data: Queries.BlogTagQuery
  pageContext: BlogTagContext
}
export default function BlogTag({ data, pageContext }: BlogTagProps) {
  const { edges: posts } = data.allMarkdownRemark
  const { currentPage, numPages, tag } = pageContext
  const breadcrumbs = pageContext.breadcrumb.crumbs.filter(({ pathname }) => pathname !== '/blog/tag')
  return (
    <LayoutTemplate>
      {breadcrumbs && (
        <>
          <BreadcrumbsSEO breadcrumbs={breadcrumbs} />
          <Container size='large'>
            <Breadcrumbs breadcrumbs={breadcrumbs.slice(1)} />
          </Container>
        </>
      )}

      <Section>
        <Container size='large'>
          {tag === 'webinar' ? (
            <h1 className={styles.title}>Webinars</h1>
          ) : (
            <h1 className={styles.title}>{`${kebabToTitle(tag)}`} Articles</h1>
          )}

          <Posts
            posts={posts
              .map(({ node }) => node)
              .map((node) => mapToPost(node))
              .map((post) => ({ ...post, activeTag: tag }))}
          />

          <PaginationNav
            currentPage={currentPage}
            numPages={numPages}
            basePath={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}/`}
          />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query BlogTag($skip: Int!, $limit: Int!, $tag: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { tags: { in: [$tag] }, templateKey: {eq: "long-form-content"}, isPublished: {ne: false}, isHidden: {ne: true} }
      }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: $limit
      skip: $skip
    ) {
      ...PostData
    }
  }
`

interface BlogTagContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
  tag: string
}

export function Head(props: HeadProps<Queries.BlogTagQuery, BlogTagContext>) {
  return (
    <SEO
      pathname={props.location.pathname}
      title={
        props.pageContext.tag === 'webinar'
          ? `Webinars - Fingerprint Blog | Fingerprint`
          : `${kebabToTitle(props.pageContext.tag)} Articles - Fingerprint Blog | Fingerprint`
      }
      description={`We are an open source powered company working to prevent online fraud for websites of all sizes. Read our articles on ${kebabToTitle(
        props.pageContext.tag
      )} on our blog.`}
    />
  )
}
