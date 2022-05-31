import React, { useEffect, useState } from 'react'
import { LayoutTemplate } from '../../../../components/Layout'
import BreadcrumbsSEO from '../../../../components/Breadcrumbs/BreadcrumbsSEO'
import Section from '../../../../components/common/Section'
import Container from '../../../../components/common/Container'
import Button from '../../../../components/common/Button'

import { GeneratedPageContext } from '../../../../helpers/types'
import { getQueryStringParam } from '../../../../helpers/common'

import { Link } from 'gatsby'
import useSiteMetadata from '../../../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { Helmet } from 'react-helmet'
import { isBrowser } from '../../../../helpers/detector'
import { PATH } from '../../../../constants/content'
import styles from './Apply.module.scss'
import { GREENHOUSE_COMPANY_ID } from '../../../../constants/env'
import { getJobInfoFromGreenhouse } from '../../../../helpers/api'
import { Job, ErrorMessage } from '../index'
import Skeleton from '../../../../components/Skeleton/Skeleton'
import { decode } from 'html-entities'
import { scrollToElementById } from '../../../../helpers/scrollToElementByID'
import { DangerouslyRenderHtmlContent } from '../../../../components/Content/Content'

interface ApplyPageProps {
  pageContext: GeneratedPageContext
}

export default function ApplyPage({ pageContext }: ApplyPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'FingerprintJS Careers - Join Our 100% Remote Team',
    description:
      "We're empowering developers to stop online fraud. Join us in building world-class APIs for identification and fraud detection.",
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const [job, setJob] = useState<Job>()

  useEffect(() => {
    setIsLoading(true)
    let jobId
    if (isBrowser()) {
      if (window.location.search.indexOf('gh_jid') === -1) {
        window.location.replace(PATH.jobs)
        return
      }
      jobId = getQueryStringParam(window.location.search, 'gh_jid')
    }
    async function getJobInfo() {
      try {
        const jobJson = await getJobInfoFromGreenhouse(jobId)

        const job: Job = {
          id: jobJson.id,
          title: jobJson.title,
          department: jobJson.departments && jobJson.departments[0].name,
          location: jobJson.location && jobJson.location.name,
          description: decode(jobJson.content),
        }
        setJob(job)
        setIsLoading(false)
      } catch (e) {
        onError()
      }
    }

    getJobInfo()

    function onError() {
      setHasError(true)
      setIsLoading(false)
    }
  }, [])

  const scripts = [
    {
      src: `https://boards.greenhouse.io/embed/job_board/js?for=${GREENHOUSE_COMPANY_ID}`,
      type: 'text/javascript',
      async: true,
    },
    {
      src: '/job-post.js',
      type: 'text/javascript',
      defer: true,
    },
  ]
  const stringBreakpoint = '>Gradle</a>).'
  const description = job?.description.split(stringBreakpoint, 1)[0].concat(stringBreakpoint)
  const questions =
    description &&
    job?.description.replace(description, '').replaceAll('</p></div><p>', '').replaceAll('<p>&nbsp;</p>', '')

  const tagTitles = ['Team', 'Reports to', 'Location', 'Start date', 'How to apply']
  const formattedQuestions = questions && addTagTitle(questions, tagTitles)
  return (
    <>
      <Helmet script={scripts} />
      <LayoutTemplate siteMetadata={siteMetadata}>
        {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
        <Section className={styles.section}>
          <Container size='large'>
            <Link to={PATH.jobs} className={styles.returnLink}>
              ← All jobs
            </Link>
            {hasError ? (
              <ErrorMessage />
            ) : (
              <>
                {isLoading ? (
                  <div className={styles.wrapper}>
                    <Skeleton height={106} width={768} />
                    <Skeleton className={styles.locationSkeleton} height={24} width={61} />
                    <Skeleton className={styles.descriptionSkeleton} height={280} width={768} />
                    <Skeleton className={styles.buttonSkeleton} height={58} width={134} />
                    <Skeleton className={styles.questionsSkeleton} height={264} width={768} />
                  </div>
                ) : (
                  <div className={styles.wrapper}>
                    <h1 className={styles.jobTitle}>{job?.title}</h1>
                    <p className={styles.jobLocation}>{job?.location}</p>
                    <DangerouslyRenderHtmlContent
                      content={description ?? ''}
                      className={styles.jobDescription}
                      useBlogStyles={false}
                    />
                    <Button onClick={() => scrollToElementById('grnhse_app')} size='big'>
                      Apply for this job
                    </Button>
                    <DangerouslyRenderHtmlContent
                      content={formattedQuestions ?? ''}
                      className={styles.jobQuestions}
                      useBlogStyles={false}
                    />
                  </div>
                )}
              </>
            )}
          </Container>
          {!hasError && (
            <Container size='large' className={styles.formContainer}>
              <div className={styles.form} id='grnhse_app' />
            </Container>
          )}
        </Section>
      </LayoutTemplate>
    </>
  )
}

function addTagTitle(content: string, titles: string[]) {
  const element = (title: string) => `<p class=${styles.questionTag}><tag class=${styles.tagTitle}>${title}:</tag><br/>`

  titles.forEach((title) => {
    content = content.replace(`<p><strong>${title}:&nbsp;</strong>`, element(title))
    content = content.replace(`<p><strong>${title}: </strong>`, element(title))
    content = content.replace(`<p><strong>${title}:</strong> `, element(title))
    content = content.replace(`<p><strong>${title}:</strong>&nbsp;`, element(title))
    content = content.replace(`<p><strong>${title}:</strong>`, element(title))
    content = content.replace(`<p><strong>${title}</strong>`, element(title))
  })
  return content
}
