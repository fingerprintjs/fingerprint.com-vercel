import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import Container from '../../../components/common/Container'
import { IntegrationCardProps } from '../../IntegrationCard/IntegrationCard'
import IntegrationCards from '../../IntegrationCards/IntegrationCards'

import styles from './CardsSection.module.scss'

export default function CardsSection() {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { frontmatter: { title: { eq: "integrations" }, templateKey: { eq: "integration-sdk" } } }
      ) {
        nodes {
          frontmatter {
            cards {
              cardImage {
                childImageSharp {
                  gatsbyImageData(quality: 100, layout: CONSTRAINED, aspectRatio: 1.7)
                }
              }
              description
              docsLink
              githubLink
              title
            }
          }
        }
      }
    }
  `)
  const cards = data.allMarkdownRemark.nodes[0].frontmatter.cards as IntegrationCardProps[]
  return (
    <Container size='large' className={styles.container}>
      <IntegrationCards cards={cards} />
    </Container>
  )
}
