import React, { useState, useEffect } from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import Section from '../../../components/common/Section'
import Container from '../../../components/common/Container'
import Skeleton from '../../../components/Skeleton/Skeleton'

import { GeneratedPageContext } from '../../../helpers/types'
import { repeatElement } from '../../../helpers/repeatElement'
import { MAILTO_WORK, MAILTO } from '../../../constants/content'

import useSiteMetadata from '../../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

import styles from './Jobs.module.scss'

import { Link } from 'gatsby'
import Select from 'react-select'
import { getListingsFromGreenhouse } from '../../../helpers/api'

interface JobsPageProps {
  pageContext: GeneratedPageContext
}
export interface Job {
  id: string
  title: string
  department: string
  location: string
  description: string
}

export default function JobsPage({ pageContext }: JobsPageProps) {
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

  const defaultDepartment = 'All Departments'

  const [departments, setDepartments] = useState<string[]>()
  const departmentsOptions = departments
    ? [defaultDepartment].concat(departments).map((dep) => ({ value: dep, label: dep }))
    : [{ value: defaultDepartment, label: defaultDepartment }]

  const [selectedDepartment, setSelectedDepartment] = useState(defaultDepartment)
  const [jobs, setJobs] = useState<Job[]>()
  const [filteredJobs, setFilteredJobs] = useState<Job[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleSelectedCategory = (option) => {
    const department = option.value
    setSelectedDepartment(department)
    const filterJobs =
      department === defaultDepartment
        ? jobs
        : jobs?.filter((job) => {
            return job.department === department
          })
    setFilteredJobs(filterJobs)
  }

  useEffect(() => {
    setIsLoading(true)

    async function getListings() {
      try {
        const jobsJson = await getListingsFromGreenhouse()

        const jobs: Job[] = jobsJson.jobs.map((job) => {
          return {
            id: job.id,
            title: job.title,
            department: job.departments && job.departments[0].name,
            location: job.location && job.location.name,
          }
        })
        const uniqueDepartments = new Set(jobs.map((job) => job.department))
        const departmentsArray = Array.from(uniqueDepartments)

        setDepartments(departmentsArray)
        setJobs(jobs)
        setIsLoading(false)
      } catch (e) {
        onError()
      }
    }

    getListings()

    function onError() {
      setHasError(true)
      setIsLoading(false)
    }
  }, [])

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Section className={styles.section}>
        <Container size='large'>
          <h1 className={styles.title}>Come work with us</h1>
          <div className={styles.description}>
            <div>
              <h3 className={styles.subTitle}>FingerprintJS empowers developers to stop online fraud at the source.</h3>
              <p className={styles.text}>
                We work on turning radical new ideas in the fraud detection space into reality. Our products are
                developer-focused and our clients range from solo developers to publicly traded companies. Some of our
                customers include: Target, checkout.com, coinbase and eBay just to name a few.
              </p>
            </div>
            <div>
              <h3 className={styles.subTitle}>
                We are a globally dispersed, 100% remote company with a strong open-source focus.
              </h3>
              <div className={styles.textSection}>
                <p className={styles.text}>
                  Our flagship open source project is{' '}
                  <a href='https://github.com/fingerprintjs/fingerprintjs' target='_blank' rel='noreferrer'>
                    FingerprintJS
                  </a>{' '}
                  (15.2K stars on GitHub).
                  <a target='_blank' rel='noreferrer' href='https://www.crunchbase.com/organization/fingerprintjs'>
                    We have raised $44M{' '}
                  </a>
                  and are backed by Craft Ventures (previously invested in{' '}
                  <a target='_blank' rel='noreferrer' href='https://www.tesla.com/'>
                    Tesla,{' '}
                  </a>
                  <a target='_blank' rel='noreferrer' href='https://facebook.com/'>
                    Facebook,{' '}
                  </a>
                  <a target='_blank' rel='noreferrer' href='https://www.airbnb.com/'>
                    Airbnb{' '}
                  </a>
                  ), Nexus VP (previously invested in{' '}
                  <a target='_blank' rel='noreferrer' href='https://www.postman.com/'>
                    Postman,{' '}
                  </a>
                  <a target='_blank' rel='noreferrer' href='https://hasura.io/'>
                    Hasura
                  </a>
                  ) and Uncorrelated Ventures (previously invested in{' '}
                  <a target='_blank' rel='noreferrer' href='https://redis.io/'>
                    Redis,{' '}
                  </a>
                  <a target='_blank' rel='noreferrer' href='https://rollbar.com/'>
                    Rollbar{' '}
                  </a>
                  &
                  <a target='_blank' rel='noreferrer' href='https://gradle.org/'>
                    {' '}
                    Gradle
                  </a>
                  ).
                </p>
                <p className={styles.text}>
                  Our highly-talented staff have: attended a top 10 US university, extensive startup experience, been
                  finalists in international competitions, and worked at and with well-known tech companies. See what it
                  is like from our{' '}
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.glassdoor.com/Reviews/FingerprintJS-Reviews-E4075078.htm'
                  >
                    Glassdoor reviews
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
        <Container size='large'>
          <h1 className={styles.titleCurrent}>Current Job Openings</h1>
          {hasError ? (
            <ErrorMessage />
          ) : (
            <>
              <div className={styles.selectSection}>
                <label className={styles.selectLabel}>Department</label>
                <Select
                  styles={{
                    control: (base, { isFocused }) => ({
                      ...base,
                      borderRadius: '8px',
                      borderColor: isFocused ? '#f04405' : undefined,
                      boxShadow: isFocused ? '#f04405' : undefined,
                      '&:hover': {
                        borderColor: '#f04405',
                        boxShadow: '0 0 0 1px #f04405 ',
                      },
                    }),
                    input: (base) => ({
                      ...base,
                      marginTop: '12px',
                      marginBottom: '12px',
                    }),
                    singleValue: (base) => ({
                      ...base,
                      fontFamily: 'Work Sans',
                      fontSize: '16px',
                      color: '#0D102B',
                      fontWeight: '500',
                      lineHeight: '150%',
                    }),
                    option: (base, { isFocused }) => ({
                      ...base,
                      color: isFocused ? 'white' : undefined,
                      backgroundColor: isFocused ? '#f04405' : undefined,
                    }),
                  }}
                  className={styles.select}
                  defaultValue={departmentsOptions[0]}
                  options={departmentsOptions}
                  onChange={handleSelectedCategory}
                  isLoading={isLoading}
                />
              </div>
              {isLoading ? (
                <div>
                  <Jobs department={'Marketing'} isLoading />
                  <Jobs department={'Engineering'} isLoading />
                  <Jobs department={'Product'} isLoading />
                  <Jobs department={'Sales'} isLoading />
                </div>
              ) : selectedDepartment === defaultDepartment ? (
                departments?.map((department, index) => {
                  return (
                    <div key={index}>
                      <Jobs jobs={jobs?.filter((job) => job.department === department)} department={department} />
                    </div>
                  )
                })
              ) : (
                <div>
                  <Jobs jobs={filteredJobs} department={selectedDepartment} />
                </div>
              )}
            </>
          )}
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

interface JobProps {
  department: string
  jobs?: Job[]
  isLoading?: boolean
}
function Jobs({ department, jobs, isLoading = false }: JobProps) {
  return (
    <div className={styles.jobsList}>
      <h3 className={styles.departmentTitle}>{department}</h3>
      {isLoading
        ? repeatElement(3, (index) => (
            <div key={index} className={styles.job}>
              <Skeleton className={styles.jobTitleLoading} width={400} height={30} />
              <Skeleton width={200} height={24} />
            </div>
          ))
        : jobs?.map((job, index) => {
            return (
              <div key={index} className={styles.job}>
                <Link className={styles.jobTitle} to={`/careers/jobs/apply?gh_jid=${job.id}`}>
                  {job.title}
                </Link>
                <span className={styles.jobLocation}>{job.location}</span>
              </div>
            )
          })}
    </div>
  )
}
export function ErrorMessage() {
  return (
    <div>
      <p className={styles.text}>
        An error has occurred,{' '}
        <a className={styles.link} href={MAILTO.mailToUrl}>
          please contact our support
        </a>{' '}
        or{' '}
        <a className={styles.link} href={MAILTO_WORK.mailToUrl}>
          send your resume via email
        </a>
        .
      </p>
    </div>
  )
}
