import React, { useState, useEffect } from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { useForm, Forms } from '../../../hooks/useForm'
import { FormState } from '../../../types/FormState'
import { generateBotDToken } from '../../../helpers/api'
import classNames from 'classnames'
import CodeWindowWithSelector from '../../common/CodeWindowWithSelector'
import { copyToClipboard } from '../../../helpers/clipboard'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

import { ReactComponent as CopySVG } from '../../../img/CopySVG.svg'

import { ReactComponent as DevSVG } from './DevSVG.svg'

import styles from './GenerateKeySection.module.scss'

interface GenerateKeySectionProps {
  requestId?: string
}

export default function GenerateKeySection({ requestId }: GenerateKeySectionProps) {
  const [email, setEmail] = useState('')
  const { formState, updateFormState } = useForm(Forms.BotdGenerateToken)

  const [botDToken, setBotDToken] = useState({ publicKey: '<your-public-key>', secretKey: '' })

  const { data } = useVisitorData()
  const visitorId = data?.visitorId

  const disableButton = !(requestId && data && formState !== FormState.Loading)

  interface MailKeys {
    usedEmail: string
    publicKey: string
    secretKey: string
  }
  const [usedEmails, setUsedEmails] = useLocalStorage('botd_keys', [] as MailKeys[])

  async function handleSubmit(e) {
    e.preventDefault()

    updateFormState(FormState.Loading)

    function onError() {
      updateFormState(FormState.Failed)
      setTimeout(() => {
        updateFormState(FormState.Default)
      }, 5000)
    }

    const usedKeys = usedEmails.find(({ usedEmail }) => usedEmail === email)

    if (usedKeys) {
      setBotDToken({ publicKey: usedKeys.publicKey, secretKey: usedKeys.secretKey })
      updateFormState(FormState.Success)
    } else {
      try {
        const tag = {
          ...(requestId && { requestId }),
          ...(visitorId && { visitorId }),
        }

        const response = await generateBotDToken(email, JSON.stringify(tag))
        const status = response.status

        if (status !== 200) {
          onError()
        } else {
          updateFormState(FormState.Success)
          const data = await response.json()

          const publicKey = data?.publicKey
          const secretKey = data?.secretKey

          if (publicKey && secretKey) {
            setBotDToken({ publicKey, secretKey })

            setUsedEmails([...usedEmails, { usedEmail: email, publicKey, secretKey }])
          } else {
            onError()
          }
        }
      } catch (error) {
        onError()
      }
    }
  }

  // Check before the first render if the status is successful and in this case show the last key saved in local storage
  useEffect(() => {
    if (formState === FormState.Success) {
      const sessionKey = usedEmails[usedEmails.length - 1]
      if (sessionKey) {
        setBotDToken({ publicKey: sessionKey.publicKey, secretKey: sessionKey.secretKey })
        return
      }
    }
    updateFormState(FormState.Default)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className={styles.container}>
      <section className={styles.keyGenSection}>
        <DevSVG className={styles.icon} id='generateKeySection' />
        {(formState === FormState.Default || formState === FormState.Loading) && (
          <>
            <h1 className={styles.title}>Generate my API keys</h1>
            <p className={styles.description}>
              Enter your email to generate your unique keys and code snippet. Install on your site to use our API for
              free.
            </p>
            <form className={styles.generateKeyForm} onSubmit={handleSubmit}>
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
                >
                  Generate keys
                </Button>
              </div>
            </form>
          </>
        )}
        {formState === FormState.Failed && (
          <>
            <h1 className={styles.title}>Something went wrong</h1>
            <p className={styles.description}>Please try again.</p>
          </>
        )}
        {formState === FormState.Success && (
          <>
            <h1 className={styles.title}>Your API keys were generated</h1>

            <h2 className={styles.subTitle}>Public Key</h2>
            <p className={styles.keyDescription}>Safe to use publicly on your web pages.</p>
            <div className={styles.keySection}>
              <p className={styles.key}>{botDToken.publicKey}</p>
              <CopySVG className={styles.copyIcon} onClick={() => copyToClipboard(botDToken.publicKey)} />
            </div>
            <h2 className={styles.subTitle}>Secret Key</h2>
            <p className={styles.keyDescription}>Keep this key secret, use it to verify bots server-side.</p>
            <div className={styles.keySection}>
              <p className={styles.key}>{botDToken.secretKey}</p>
              <CopySVG className={styles.copyIcon} onClick={() => copyToClipboard(botDToken.secretKey)} />
            </div>
          </>
        )}
      </section>
      <section className={styles.snippetSection}>
        <CodeWindowWithSelector
          codeBlocks={[
            {
              code: `<script>
  // Initialize an agent at application startup.
  const botdPromise = import(
    "https://openfpcdn.io/botd/v0.1"
  ).then( Botd =>
    Botd.load({ publicKey: "${botDToken.publicKey}" })
  );
  // Get the bot detection result when you need it.
  // Result will contain the requestId property,
  // that you can securely verify on the server.
  botdPromise
    .then(botd => botd.detect())
    .then(result => console.log(result))
    .catch(error => console.error(error))
</script>`,
              language: 'html',
              type: 'CDN',
            },
            {
              code: `import Botd from "@fpjs-incubator/botd-agent";

// Initialize an agent at application startup.
const botdPromise = Botd.load({
  publicKey: "${botDToken.publicKey}",
});

(async () => {
  // Get the bot detection result when you need it.
  // Result will contain the requestId property,
  // that you can securely verify on the server.
  const botd = await botdPromise;
  const result = await botd.detect();
  console.log(result);
})();`,
              language: 'javascript',
              type: 'NPM',
            },
          ]}
        />
      </section>
    </Container>
  )
}
