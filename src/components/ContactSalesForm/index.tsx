import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import Section from '../../components/common/Section'
import classNames from 'classnames'
import { Link } from 'gatsby'

import { FormState } from '../../types/FormState'
import { trackLeadSubmit } from '../../helpers/gtm'
import { Forms, useForm } from '../../hooks/useForm'
import { createNewLead } from '../../helpers/api'
import { ReactComponent as ConfirmSVG } from './confirmSVG.svg'
import { ReactComponent as ErrorSVG } from './errorSVG.svg'
import { ReactComponent as InfoSVG } from './info.svg'

import { URL_CALENDAR, PATH, MAILTO_SALES } from '../../constants/content'
import { useViewTracking } from '../../context/HistoryListener'
import * as Turing from '@fpjs-incubator/turing'
import { initTuring } from '../../helpers/turing'
import { ReactComponent as BotD } from '../../img/BotdBowl.svg'
import Tippy from '@tippyjs/react'
import { useUserLocation } from '../../hooks/useUserLocation'
import { Region } from '../../helpers/region'

import styles from './ContactSalesForm.module.scss'
import { BOTD_PUBLIC_KEY_TURING, TURING_DEFAULT_SESSION_ID } from '../../constants/env'

export default function ContactSalesForm() {
  const [formName, setFormName] = useState('')
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [visibleName, setVisibleName] = useState(false)
  const [visibleMail, setVisibleMail] = useState(false)
  const [visibleWebsite, setVisibleWebsite] = useState(false)
  const [description, setDescription] = useState('')

  const { formState, errorMessage, updateFormState, updateErrorMessage } = useForm(Forms.ContactSales)
  const { landingPage, previousPage, utmParams } = useViewTracking()
  const { countryRegion } = useUserLocation()

  async function handleSubmit(e) {
    e.preventDefault()
    if (formName === '') {
      setVisibleName(true)
      setTimeout(() => {
        setVisibleName(false)
      }, 4000)
      return
    }
    if (email === '') {
      setVisibleMail(true)
      setTimeout(() => {
        setVisibleMail(false)
      }, 4000)
      return
    }
    if (url === '') {
      setVisibleWebsite(true)
      setTimeout(() => {
        setVisibleWebsite(false)
      }, 4000)
      return
    }
    try {
      let sessionId

      try {
        sessionId = await Turing.execute()
      } catch (error) {
        if (TURING_DEFAULT_SESSION_ID) {
          sessionId = TURING_DEFAULT_SESSION_ID
        } else {
          throw new Error()
        }
      }

      if (!sessionId) {
        throw new Error()
      }
      const response = await createNewLead(
        formName,
        email,
        url,
        jobTitle,
        description,
        landingPage,
        previousPage,
        utmParams,
        sessionId
      )
      const status = response.status
      const { ok, error } = await response.json()

      if (status !== 200 || !ok) {
        onError(error)
      } else {
        updateFormState(FormState.Success)
        trackLeadSubmit()
        let calendarUrl: string
        switch (countryRegion) {
          case Region.LATAM:
            calendarUrl = URL_CALENDAR.contactSalesCalendarLatam
            break
          case Region.APAC:
            calendarUrl = URL_CALENDAR.contactSalesCalendarApac
            break
          case Region.EMEA:
            calendarUrl = URL_CALENDAR.contactSalesCalendarEmea
            break
          case Region.AMER:
          default:
            calendarUrl = URL_CALENDAR.contactSalesCalendarAmer
        }

        setTimeout(() => {
          window.location.replace(calendarUrl)
        }, 500)
      }
    } catch (error) {
      onError()
    }

    function onError(error?) {
      updateFormState(FormState.Failed)

      if (error?.message) {
        if (error?.data?.[0]?.instancePath) {
          updateErrorMessage(`Validation error for ${error?.data[0]?.instancePath.substring(1)}`)
        } else if (error?.param === 'Turing') {
          updateErrorMessage('The answer to the challenge question was incorrect.')
          trackLeadSubmit(false)
          return
        } else if (error?.param === 'Email / Phone') {
          updateErrorMessage('The format of your email or phone is incorrect.')
          trackLeadSubmit(false)
          return
        } else {
          updateErrorMessage(error?.message)
        }
      }
      setTimeout(() => {
        updateFormState(FormState.Default)
      }, 10000)
      trackLeadSubmit(false)
    }
  }

  useEffect(() => {
    initTuring()
  }, [])

  return (
    <>
      <Section
        className={classNames(
          styles.contactSalesFormSection,
          { [styles.formSection]: formState === FormState.Default || formState === FormState.Loading },
          { [styles.stateSection]: formState === FormState.Failed || formState === FormState.Success }
        )}
      >
        {(formState === FormState.Default || formState === FormState.Loading) && (
          <>
            <h1 className={styles.header}>
              Complete the form, our expert team will reach out shortly to schedule a call.
            </h1>
            <div className={styles.contactSalesForm} data-sitekey={BOTD_PUBLIC_KEY_TURING}>
              <div className={styles.form}>
                <label className={styles.label} htmlFor='formName'>
                  Your name
                </label>
                <Tippy
                  maxWidth={270}
                  content={
                    <div className={styles.warningTooltip}>
                      <InfoSVG />
                      <span> Please fill out this field</span>
                    </div>
                  }
                  visible={visibleName}
                >
                  <input
                    className={styles.input}
                    id='formName'
                    maxLength={40}
                    name='formName'
                    size={20}
                    type='text'
                    placeholder='John'
                    onChange={(e) => setFormName(e.target.value)}
                    disabled={formState === FormState.Loading}
                    required
                  />
                </Tippy>

                <label className={styles.label} htmlFor='email'>
                  Work email
                </label>
                <Tippy
                  maxWidth={270}
                  content={
                    <div className={styles.warningTooltip}>
                      <InfoSVG />
                      <span> Please fill out this field</span>
                    </div>
                  }
                  visible={visibleMail}
                >
                  <input
                    className={styles.input}
                    id='email'
                    maxLength={64}
                    name='email'
                    size={20}
                    type='email'
                    placeholder='john@gmail.com'
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={formState === FormState.Loading}
                    required
                  />
                </Tippy>

                <label className={styles.label} htmlFor='jobTitle'>
                  Job title
                </label>
                <input
                  className={styles.input}
                  id='jobTitle'
                  maxLength={40}
                  name='jobTitle'
                  size={20}
                  type='text'
                  placeholder='Developer'
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={formState === FormState.Loading}
                />
                <label className={styles.label} htmlFor='url'>
                  Company website
                </label>
                <Tippy
                  maxWidth={270}
                  content={
                    <div className={styles.warningTooltip}>
                      <InfoSVG />
                      <span> Please fill out this field</span>
                    </div>
                  }
                  visible={visibleWebsite}
                >
                  <input
                    className={styles.input}
                    id='url'
                    maxLength={80}
                    name='url'
                    size={20}
                    type='text'
                    placeholder='google.com'
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={formState === FormState.Loading}
                    required
                  />
                </Tippy>
                <label className={styles.label} htmlFor='description'>
                  Tell us about your project
                </label>
                <textarea
                  className={styles.textArea}
                  name='description'
                  id='description'
                  rows={3}
                  placeholder='Tell us about your project, needs, or any questions you may have'
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={formState === FormState.Loading}
                />

                <Button
                  className={classNames(styles.button, { [styles.loadingButton]: formState === FormState.Loading })}
                  type='submit'
                  size='big'
                  disabled={formState === FormState.Loading}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
              <PoweredByBotD className={styles.desktopOnly} />
            </div>
          </>
        )}
        {formState === FormState.Failed && (
          <>
            <ErrorSVG className={styles.logo} />
            <h2 className={styles.message}>An error occurred</h2>

            <span className={styles.errorDescription}>
              {errorMessage && (
                <>
                  {errorMessage}
                  <br />
                </>
              )}
              Please try again or contact{' '}
              <Link to={PATH.support} className={styles.link}>
                support.
              </Link>
            </span>
          </>
        )}
        {formState === FormState.Success && (
          <>
            <ConfirmSVG className={styles.logo} />
            <h2 className={styles.message}>We&apos;ll reach out to you shortly</h2>
          </>
        )}
      </Section>
      <PoweredByBotD className={styles.mobileOnly} />
    </>
  )
}
export interface PoweredByBotDProps {
  className: string
}
function PoweredByBotD({ className }: PoweredByBotDProps) {
  return (
    <div className={classNames(className, styles.poweredBy)}>
      <p className={styles.botdDescription}>
        <span>
          <BotD className={styles.botD} />
        </span>
        <span>
          Our form spam detection is powered by{' '}
          <a className={styles.link} href={PATH.botD}>
            BotD
          </a>
          .
        </span>
      </p>
      <p className={styles.text}>
        If you have problems with submission please{' '}
        <a className={styles.link} href={MAILTO_SALES.mailToUrl}>
          contact us via email
        </a>
        .
      </p>
    </div>
  )
}
