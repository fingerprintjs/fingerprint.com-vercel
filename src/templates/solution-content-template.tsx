import React from 'react'
import { LayoutTemplate } from '../components/Layout'
import Section from '../components/common/Section'
import Container from '../components/common/Container'
import { Link } from 'gatsby'
import Button from '../components/common/Button'
import { Content } from '../components/Content/Content'
import { SolutionProps } from '../components/solutions/Solution/Solution'
import JoinCommunitySection from '../components/JoinCommunitySection/JoinCommunitySection'
import RelatedSolutions from '../components/RelatedSolutions/RelatedSolutions'
import { URL } from '../constants/content'
import { useGithubFpjs } from '../context/GithubContext'

import TagList from '../components/TagList/TagList'

import styles from './solution-content.module.scss'

export interface BottomLink {
  text: string
  url: string
}
export interface TemplateProps {
  metadata: GatsbyTypes.SiteSiteMetadata
  solution?: SolutionProps
  funnel: string[]
  category: string[]
  industry: string[]
  title: string
  description: string
  iframeUrl: string
  shareUrl: string
  docsUrl: string
  body: string | React.ReactNode
  contentComponent?: React.FunctionComponent<{ content: string | React.ReactNode; className?: string }>
  bottomLinks?: BottomLink[]
}

export default function SolutionContentTemplate({
  metadata,
  solution,
  funnel,
  category,
  industry,
  title,
  description,
  iframeUrl,
  shareUrl,
  docsUrl,
  body,
  contentComponent,
  bottomLinks,
}: TemplateProps) {
  const ContentComponent = contentComponent ?? Content
  const { githubData } = useGithubFpjs()
  const starsLabel = githubData && {
    labels: [`${Math.floor(githubData?.stargazers_count / 1000)}K+ Stars`],
  }

  return (
    <LayoutTemplate siteMetadata={metadata}>
      <Section className={styles.root}>
        <Container className={styles.container}>
          <Link to='/solutions' className={styles.backLink}>
            ← Back to solutions
          </Link>
          <header className={styles.header}>
            <div className={styles.tags}>
              <TagGroup label='funnel' tags={funnel} />
              <TagGroup label='Category' tags={category} />
              <TagGroup label='Industry' tags={industry} />
            </div>
          </header>
          <section className={styles.titleSection}>
            <h1 className={styles.title}>{title}</h1>
            <h3 className={styles.description}>{description}</h3>
          </section>
          <section className={styles.codeSection}>
            <h3 className={styles.label}>Explore live technical demo</h3>
            <iframe className={styles.iframe} src={iframeUrl} />
            <div className={styles.buttons}>
              <Button className={styles.button} href={shareUrl} size='big' openNewTab>
                Run demo in your browser
              </Button>
              <Button className={styles.button} href={docsUrl} variant='outline' size='big' openNewTab>
                Documentation
              </Button>
            </div>
          </section>
          <section className={styles.bodySection}>
            <ContentComponent content={body} className={styles.content} />
            {bottomLinks && (
              <div className={styles.bottomLinks}>
                {bottomLinks.map(({ text, url }) => (
                  <a key={url} href={url} target='_blank' rel='noreferrer'>
                    {text}
                  </a>
                ))}
              </div>
            )}
          </section>
        </Container>
        <JoinCommunitySection
          title='Join the community'
          discordLink={URL.discordServerURL}
          githubLink={URL.githubCommunityRepoUrl}
          {...starsLabel}
        >
          Fingerprint’ open source technology is supported by contributing developers across the globe. Stay up to date
          on our latest technical solutions, integrations and updates.
        </JoinCommunitySection>
        <Container size='large' className={styles.relatedSolutions}>
          {solution && <RelatedSolutions solution={solution} />}
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

interface TagGroupProps {
  tags: string[]
  label: string
}
function TagGroup({ tags, label }: TagGroupProps) {
  return (
    <div className={styles.tag}>
      <span className={styles.tagLabel}>{label}</span>
      <TagList link='/solutions' className={styles.tagList} tags={tags} format='title' />
    </div>
  )
}
