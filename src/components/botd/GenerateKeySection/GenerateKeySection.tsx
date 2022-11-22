import React, { useState, useEffect } from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { useForm, Forms } from '../../../hooks/useForm'
import { FormState } from '../../../types/FormState'
import { requestBotdKeys } from '../../../helpers/api'
import classNames from 'classnames'
import CodeWindowWithSelector from '../../common/CodeWindowWithSelector'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { initTuring } from '../../../helpers/turing'
import * as Turing from '@fpjs-incubator/turing'
import { BOTD_PUBLIC_KEY_TURING, TURING_DEFAULT_SESSION_ID } from '../../../constants/env'
import { PATH } from '../../../constants/content'
import { ReactComponent as BotD } from '../../../img/BotdBowl.svg'
import { ReactComponent as DevSVG } from './DevSVG.svg'
import { useViewTracking } from '../../../context/HistoryListener'
import { getConfig } from '../../../helpers/fpjs'

import styles from './GenerateKeySection.module.scss'

export default function GenerateKeySection() {
  const [email, setEmail] = useState('')
  const { formState, updateFormState, errorMessage, updateErrorMessage } = useForm(Forms.BotdGenerateToken)

  const { data } = useVisitorData(getConfig)
  const { utmParams } = useViewTracking()

  const disableButton = !(data && formState !== FormState.Loading)

  interface UsedMails {
    usedEmail: string
  }
  const [usedEmails, setUsedEmails] = useLocalStorage('botd_request_keys', [] as UsedMails[])

  async function handleSubmit(e) {
    e.preventDefault()

    function onError(error?) {
      if (error?.error?.message === 'turing challenge is not verified') {
        updateErrorMessage('The answer to the challenge question was incorrect.')
        updateFormState(FormState.Failed)
        return
      }
      updateFormState(FormState.Failed)
      setTimeout(() => {
        updateFormState(FormState.Default)
      }, 5000)
    }

    const usedEmail = usedEmails.find(({ usedEmail }) => usedEmail === email)

    if (usedEmail) {
      updateFormState(FormState.Success)
    } else {
      try {
        updateFormState(FormState.Loading)
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

        const response = await requestBotdKeys(email, sessionId, utmParams)
        const status = response.status
        if (status !== 200) {
          const error = await response.json()

          onError(error)
        } else {
          updateFormState(FormState.Success)
          setUsedEmails([...usedEmails, { usedEmail: email }])
        }
      } catch (error) {
        onError()
      }
    }
  }

  useEffect(() => {
    initTuring()
  }, [])

  return (
    <Container size='large' className={styles.container}>
      <section id='requestKeys' className={styles.keyGenSection}>
        <DevSVG className={styles.icon} id='generateKeySection' />
        {(formState === FormState.Default || formState === FormState.Loading) && (
          <>
            <h1 className={styles.title}>Get started with BotD</h1>
            <p className={styles.description}>
              Fingerprint Pro customers on an annual contract can get started with BotD right away - enter your email to
              get in contact with our team. Otherwise we will add you to our waitlist.
            </p>
            <div className={styles.generateKeyForm} data-sitekey={BOTD_PUBLIC_KEY_TURING}>
              <label className={styles.label} htmlFor='email'>
                Work email
              </label>
              <div className={styles.form}>
                <input
                  className={styles.input}
                  id='email'
                  maxLength={64}
                  name='email'
                  size={20}
                  type='email'
                  placeholder='john@company.com'
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disableButton}
                  required
                />
                <Button
                  type='submit'
                  size='big'
                  className={classNames({ [styles.loadingButton]: formState === FormState.Loading })}
                  disabled={disableButton}
                  onClick={handleSubmit}
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
            <p className={styles.poweredBy}>
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
          </>
        )}
        {formState === FormState.Failed && (
          <>
            <h1 className={styles.title}>{errorMessage ?? 'Something went wrong'}</h1>
            <p className={styles.description}>Please try again.</p>
          </>
        )}
        {formState === FormState.Success && <h1 className={styles.title}>We will be in touch soon!</h1>}
      </section>
      <section className={styles.snippetSection}>
        <CodeWindowWithSelector
          codeBlocks={[
            {
              code: `<script>
// Initialize the agent at application startup.
const fpPromise = import('https://fpjscdn.net/v3/<api-key>')
  .then(FingerprintJS => FingerprintJS.load())

fpPromise
  .then(fp => fp.get())
  .then(result => {
    // Result will contain the requestId property,
    // that you can securely verify on the server.
    const requestId = result.requestId
    console.log(requestId)
  })
</script>`,
              language: 'html',
              type: 'CDN',
            },
            {
              code: `import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({
  apiKey: <api-key>
})

fpPromise
  .then(fp => fp.get())
  // Result will contain the requestId property,
  // that you can securely verify on the server.
  .then(result => console.log(result.requestId))

  `,

              language: 'javascript',
              type: 'NPM',
            },
          ]}
        />
      </section>
    </Container>
  )
}
