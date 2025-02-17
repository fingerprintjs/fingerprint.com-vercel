import { graphql, HeadProps } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { mapToPost } from '../components/Post/Post'
import Posts from '../components/Posts/Posts'
import { GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import AuthorSummary from '../components/AuthorSummary/AuthorSummary'
import { withTrailingSlash, withoutTrailingSlash, normalizeWord } from '../helpers/url'

import { useSiteMetadata } from '../hooks/useSiteMetadata'

import { SEO } from '../components/SEO/SEO'
import styles from './author.module.scss'

interface AuthorTagProps {
  data: Queries.BlogAuthorTagQuery
  pageContext: AuthorTagContext
}
export default function AuthorTag({ data, pageContext }: AuthorTagProps) {
  const { edges: posts } = data.posts
  const bio = data.authorData?.frontmatter?.bio
  const photo = data.authorData?.frontmatter?.photo?.childImageSharp?.gatsbyImageData
  const role = data.authorData?.frontmatter?.role
  const tags = data.allTags.group.map(({ tag }) => tag) as string[]

  const { currentPage, numPages, author, tag } = pageContext
  const breadcrumbs = pageContext.breadcrumb.crumbs.filter(({ pathname }) => pathname !== '/blog/author')

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Container size='large' className={styles.authorSection}>
        <AuthorSummary author={author} role={role} bio={bio} photo={photo} linkBack />
        <Posts
          name={`${author}'s Articles`}
          posts={posts.map(({ node }) => mapToPost(node))}
          tags={tags}
          perRow={3}
          activeTag={tag}
          tagLink={`/blog/author/${normalizeWord(author)}/`}
        />

        <PaginationNav
          currentPage={currentPage}
          numPages={numPages}
          basePath={`/blog/author/${normalizeWord(author)}/${normalizeWord(tag)}/`}
        />
      </Container>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query BlogAuthorTag($skip: Int!, $limit: Int!, $author: String, $tag: String) {
    allTags: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(blog)/.*\\.md$/"}, frontmatter: {authors: {in: [$author]}, templateKey: {eq: "long-form-content"}, isPublished: {ne: false}, isHidden: {ne: true}}}
      sort: {order: DESC, fields: frontmatter___publishDate}
      limit: $limit
      skip: $skip
    ) {
      group(field: frontmatter___tags) {
       tag: fieldValue
      }
    }
    posts: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/(blog)/.*\\.md$/"}, frontmatter: {authors: {in: [$author]},tags: { in: [$tag] }, templateKey: {eq: "long-form-content"}, isPublished: {ne: false}, isHidden: {ne: true}}}
      sort: {order: DESC, fields: frontmatter___publishDate}
      limit: $limit
      skip: $skip
    ) {
      ...PostData
    }
    authorData: markdownRemark(frontmatter: {title: {eq: $author}}) {
      frontmatter {
        bio
        role
        photo {
          childImageSharp {
            gatsbyImageData(width: 128,height: 128, placeholder: BLURRED, formats: [AUTO])
          }
        }
      }
    }
  }
`

interface AuthorTagContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
  author: string
  tag: string
}

export function Head(props: HeadProps<Queries.BlogAuthorTagQuery, AuthorTagContext>) {
  const { siteUrl } = useSiteMetadata()
  const pageUrl = `${siteUrl}${props.location.pathname}`
  const authorUrl = withoutTrailingSlash(pageUrl).slice(0, withoutTrailingSlash(pageUrl).lastIndexOf('/'))
  return (
    <SEO
      pathname={props.location.pathname}
      title={`${props.pageContext.author}'s Articles - Fingerprint Blog | Fingerprint`}
      description={`We are an open source powered company working to prevent online fraud for websites of all sizes. Read our articles written by ${props.pageContext.author} on our blog.`}
    >
      <link rel='canonical' key={withTrailingSlash(authorUrl)} href={withTrailingSlash(authorUrl)} />
    </SEO>
  )
}
